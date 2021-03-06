import { get } from 'lodash'

//
import jp from '@nr8/lib-jmespath'

//
import { matchRouter } from '../helpers/request'

//
export async function create (request) {
  const { exec } = this
  const [resource, id] = request.spec.type.split('/')

  //
  const object = await exec('read', resource, id)

  if (!object) {
    throw new Error(`resource definition for "${request.spec.type}" does not exist`)
  }

  //
  const definition = await exec('read', 'types', object.type)

  if (!definition) {
    throw new Error(`resource definition for "${object.type}" does not exist`)
  }

  // const plural = get('spec.names.plural', definition)

  //
  const requestObject = {
    ...request,
    metadata: {
      ...object.metadata,
    }
  }

  // @TODO
  // events.emit(`/${plural}/request`, requestObject)

  // @TODO validate request fields

  const routers = await exec('read', 'routers')
  const [router, policy] = matchRouter(routers, requestObject)

  if (router && policy) {
    const serviceName = get(policy, 'proxy.service.name')
    const groupName = get(policy, 'proxy.service.group')

    //
    const service = await exec('read', 'service', serviceName)

    if (service) {
      const serviceGroup = jp(`spec.groups[?name==\`${groupName}\`] | [0]`, service)
      const target = get(serviceGroup, 'targets[0]')

      if (target.type === 'node') {
        const module = require(target.path)

        if (object.type === 'Query') {
          const response = {
            apiVersion: 'nr8.io/v1alpha',
            type: 'Response',
            metadata: {
              name: request.metadata.uid
            }
          }

          try {
            const data = await module[target.subPath || 'default'].apply(this, [requestObject])

            await exec('create', { ...response, data })
          } catch (e) {
            await exec('create', {
              ...response,
              error: {
                message: e.message
              }
            })
          }
        } else {
          try {
            await module[target.subPath || 'default'].apply(this, [requestObject])
          } catch (e) {
            // @TODO update request status to reflect the error, write to event log etc...
          }
        }
      }
    }
  }

  return requestObject
}

//
export async function init (ctx, object) {
  // const { queue } = ctx

  // queue.subscribe('/requests/create', async (object) => {
  //   await requestHandler(object, ctx)
  // })

  return object
}
