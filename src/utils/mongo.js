const mongoose = require('mongoose')
const dbConfig = require('../config/db')
const debug = require('debug')('db:mongo')

const url = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.db}`
var options = {}
if (dbConfig.user) {
  options.user = dbConfig.user
  options.pass = dbConfig.password
}
module.exports = () => {
  mongoose.connect(url, options, (err) =>{
    if (err) {
      const message = `mongodb connect to ${url} error`
      console.log(message)
      process.exit(1)
    }
    debug(`mongodb connect success, url: ${url}`)
  })
}