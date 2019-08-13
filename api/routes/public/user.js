const DB = require('@DB')

module.exports = (Router) => {
  const auth = (req, res, next)=>{
    const token = req.headers.authorization  
    next()
  }

  Router.get('/user/profile', auth, async (req, res, next) => {
    
    res.end('Profile')
  })

  Router.get('/user/create', async (req, res, next) => {
   
    res.end('made')
  })
 
  return this 
}