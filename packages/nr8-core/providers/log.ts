import pino from 'pino'

//
const log = pino({
  level: 'trace',
  prettyPrint: {
    colorize: false,
    singleLine: true,
    ignore: 'pid,hostname',
    translateTime: 'SYS:standard'
  }
})

//
export function trace (...args) {
  return log.trace.apply(log, args)
}

//
export function debug (...args) {
  return log.debug.apply(log, args)
}

//
export function info (...args) {
  return log.info.apply(log, args)
}

//
export function warn (...args) {
  return log.warn.apply(log, args)
}

//
export function error (...args) {
  return log.error.apply(log, args)
}

//
export function fatal (...args) {
  return log.fatal.apply(log, args)
}

//
export default log
