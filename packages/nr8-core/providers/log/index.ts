import pino from 'pino'

//
export function defaultLogAdaptor (config = {}) {
  const logger = pino({
    level: 'trace',
    prettyPrint: {
      colorize: false,
      ignore: 'pid,hostname',
      translateTime: 'SYS:standard'
    },
    ...config
  })

  return {
    trace: (...args) => {
      return logger.trace.apply(logger, args)
    },
    debug: (...args) => {
      return logger.debug.apply(logger, args)
    },
    info: (...args) => {
      return logger.info.apply(logger, args)
    },
    warn: (...args) => {
      return logger.warn.apply(logger, args)
    },
    error: (...args) => {
      return logger.error.apply(logger, args)
    },
    fatal: (...args) => {
      return logger.error.apply(logger, args)
    }
  }
}

//
export default function (adaptor = defaultLogAdaptor()) {
  return {
    trace: (...args) => {
      return adaptor.trace(...args)
    },
    debug: (...args) => {
      return adaptor.debug(...args)
    },
    info: (...args) => {
      return adaptor.info(...args)
    },
    warn: (...args) => {
      return adaptor.warn(...args)
    },
    error: (...args) => {
      return adaptor.error(...args)
    },
    fatal: (...args) => {
      return adaptor.fatal(...args)
    }
  }
}
