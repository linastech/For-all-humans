const logger = require('@logger')(__filename)
const jwt = require('jsonwebtoken')

module.exports = (Router) => {
  Router.post('/auth/login', async (req, res, next) => {
    try {
      const token = jwt.sign({userId: 999}, "tokenKey")

      res.status(200).json({token: token})
    }catch(err){ next(err) }
  })

  return this 
}