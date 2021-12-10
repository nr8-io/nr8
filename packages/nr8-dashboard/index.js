const next = require('next')
const { parse } = require('url')

//
module.exports = function (config) {
  const { basePath } = config

  // configure next app
  const app = next({ 
    dir: `${module.path}`,
    conf: { basePath }
  })

  // raw nextjs request handler
  const nextRequestHandler = app.getRequestHandler()

  //
  app.nextRequestHandler = nextRequestHandler
    
  //
  app.getRequestHandler = () => (req, res) => {
    return nextRequestHandler(req.raw || req, res.raw || res, parse(req.url, true))
  }

  //
  return app
}
