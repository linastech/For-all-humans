const path = require('path')
const consign = require ('consign')
const express = require('express')
const Router = express.Router()

consign({ cwd: path.join(__dirname) })
  .include('public')
  .into(Router)

module.exports = Router