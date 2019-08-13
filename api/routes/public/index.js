const logger = require('@logger')(__filename)

module.exports = (Router) => {
  Router.use((req, res, next) => { 
    logger.info('API %s request to %s', req.method, req.path);
  
    next()
  })

  return this
}