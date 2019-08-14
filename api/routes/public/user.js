const DB = require('@DB')

module.exports = (Router) => {
  const auth = (req, res, next)=>{
    const token = req.headers.authorization  
    next()
  }

  Router.get('/user/profile', auth, async (req, res, next) => {
  })

  Router.post('/user/register', async (req, res, next) => {
    try {
      const { userData } = req.body

      await DB.user.createUser(userData)

      res.sendStatus(201)
    }catch(err){
      // next(err)
      res.sendStatus(500)
    }
  })
 
  return this 
}