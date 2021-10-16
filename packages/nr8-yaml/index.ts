import fs from 'fs'
import { resolve, dirname, join } from 'path'
import yaml from 'js-yaml'

//
export function loadFile (...path) {
  const file = resolve(join(...path))
  const fileDir = dirname(file)

  const FileYamlType = new yaml.Type('!file', {
    kind: 'scalar',
    construct: function (file) {
      return fs.readFileSync(join(fileDir, file), { encoding: 'utf8' })
    },
    instanceOf: String
  })

  const CUSTOM_SCHEMA = yaml.DEFAULT_SCHEMA.extend([FileYamlType])

  return yaml.load(fs.readFileSync(file, { encoding: 'utf8' }), { schema: CUSTOM_SCHEMA })
}

//
export function loadAllFile (...path) {
  const file = resolve(join(...path))
  const fileDir = dirname(file)

  const FileYamlType = new yaml.Type('!file', {
    kind: 'scalar',
    construct: function (file) {
      return fs.readFileSync(join(fileDir, file), { encoding: 'utf8' })
    },
    instanceOf: String
  })

  const CUSTOM_SCHEMA = yaml.DEFAULT_SCHEMA.extend([FileYamlType])

  return yaml.loadAll(fs.readFileSync(file, { encoding: 'utf8' }), null, { schema: CUSTOM_SCHEMA })
}

//
export default { ...yaml, loadFile, loadAllFile }
