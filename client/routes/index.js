const nextRoutes = require('next-routes')()
const pages = require('./client/pages.js')
const auth = require('./client/auth.js')
const misc = require('./client/misc.js')
const user = require('./client/user.js')

//add all routes to the router object
pages.forEach(route => nextRoutes.add(route))
auth.forEach(route => nextRoutes.add(route))
misc.forEach(route => nextRoutes.add(route))
user.forEach(route => nextRoutes.add(route))

module.exports = nextRoutes