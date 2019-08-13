const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const DB = {}

// Option 1: Passing parameters separately
const sequelize = new Sequelize(
  process.env.DB_DEFAULT_DB, 
  process.env.DB_USERNAME, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
)

fs
  .readdirSync(__dirname)
  .filter(model => model != 'index.js')
  .forEach(modelName => {
    DB[modelName.slice(0, -3)] = sequelize.import(`./${modelName}`)
  })

// create all the defined tables in the specified database.
sequelize.sync()
	.then(() => console.log('posts table has been successfully created, if one doesn\'t exist'))
  .catch(error => console.log('An error has occured', error))
  
module.exports = DB