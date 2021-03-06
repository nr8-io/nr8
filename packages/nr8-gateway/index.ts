//
import { eachSeries } from 'async'
import { loadFile as yaml } from '@nr8/lib-yaml'

//
export const definitions = [
  yaml(__dirname, 'definitions/actions.yaml'),
  yaml(__dirname, 'definitions/events.yaml'),
  yaml(__dirname, 'definitions/features.yaml'),
  yaml(__dirname, 'definitions/queries.yaml'),
  yaml(__dirname, 'definitions/requests.yaml'),
  yaml(__dirname, 'definitions/responses.yaml'),
  yaml(__dirname, 'definitions/routers.yaml'),
  yaml(__dirname, 'definitions/services.yaml')
]

//
export const controllers = [
  yaml(__dirname, 'controllers/gateway.yaml')
]

//
export default async function withGateway (nr8) {
  //
  await eachSeries(definitions, async (def) => nr8.create(def))

  //
  await eachSeries(controllers, async (def) => nr8.create(def))

  return nr8
}
