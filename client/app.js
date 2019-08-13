const next = require('next')
const routes = require('./routes/index')
const express = require('express')
const bodyParser = require("body-parser")

const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app)


app.prepare().then(() => {
  const server = express()

  server.use(handler)
  server.use(express.static('static'))


  server.listen(3060)
})