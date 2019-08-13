require('dotenv').config()
require('module-alias/register')
const cors = require('cors')
const express = require('express')

const server = express()

server.use(cors())
server.use('/api/v1/', require('./routes/'))

server.listen(process.env.PORT, () => console.log(`API server has started on ${process.env.PORT} port!`))