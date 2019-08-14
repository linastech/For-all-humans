const logger = require('@logger')(__filename)
const DB = require('@DB')
const jwt = require('jsonwebtoken')

module.exports = (Router) => {
  Router.post('/auth/login', async (req, res, next) => {
    try {
      const response = await DB.user.authenticate(req.body.username, req.body.password)

      if(response.authenticated){
        const token = jwt.sign({userId: response.userData.id}, "tokenKey")

        res.json({
          token: token,
          userData: response.userData
        })
      }else{
        res.sendStatus(401)
      }
    }catch(err){ next(err) }
  })

  return this 
}