const mongoose = require('mongoose')
const dbConfig = require('../config/db')

const uri = `mongodb://${dbConfig.host}/${dbConfig.db}`
var options = {}
if (dbConfig.user) {
  options.user = dbConfig.user
  options.pass = dbConfig.password
}

module.exports = () => {
  mongoose.createConnection(uri, options)
}