import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { flatMap, isArray } from 'lodash'
import { isPlainObject } from 'lodash/fp'

//
const extensions = ['.yml', '.yaml', '.js', '.json']

//
function yamlLoadAll (file) {
  const dir = path.dirname(file)

  const FileYamlType = new yaml.Type('!file', {
    kind: 'scalar',
    construct: function (file) {
      return fs.readFileSync(path.join(dir, file), { encoding: 'utf8' })
    },
    instanceOf: String
  })

  const CUSTOM_SCHEMA = yaml.DEFAULT_SCHEMA.extend([FileYamlType])

  return yaml.loadAll(fs.readFileSync(file, { encoding: 'utf8' }), null, { schema: CUSTOM_SCHEMA })
}

//
function allowedExtensions (file) {
  return extensions.includes(path.extname(file))
}

//
export function loadFiles (files) {
  const objects = flatMap(files.filter(allowedExtensions), (file) => {
    switch (path.extname(file)) {
      case '.yml':
      case '.yaml':
        return yamlLoadAll(file)
      case '.js':
      case '.json': {
        const result = require(file)

        if (isArray(result)) {
          return result
        } else {
          return [require(file)]
        }
      }
    }
  })

  // check for supported object structures
  const resources = objects.filter((object) => {
    if (!isPlainObject(object)) {
      return false
    }

    const { apiVersion, type, metadata } = object

    if (!metadata.name) {
      return false
    }

    return apiVersion && type
  })

  return resources
}

//
export function loadPath (path) {
  const files = fs.readdirSync(path)
    .map((file) => `${path}/${file}`)
    .filter(allowedExtensions)

  return loadFiles(files)
}
