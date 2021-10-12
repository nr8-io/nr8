import pino from 'pino'

const defaultLogger = pino({
  level: 'trace',
  prettyPrint: {
    colorize: false,
    // singleLine: true,
    ignore: 'pid,hostname',
    translateTime: 'SYS:standard'
  }
})

//
export const trace = (...args) => defaultLogger.trace.apply(defaultLogger, args)
export const debug = (...args) => defaultLogger.debug.apply(defaultLogger, args)
export const info = (...args) => defaultLogger.info.apply(defaultLogger, args)
export const warn = (...args) => defaultLogger.warn.apply(defaultLogger, args)
export const error = (...args) => defaultLogger.error.apply(defaultLogger, args)
export const fatal = (...args) => defaultLogger.fatal.apply(defaultLogger, args)

//
export default defaultLogger
