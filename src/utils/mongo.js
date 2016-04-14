const mongoose = require('mongoose')
const dbConfig = require('../config/db')

// const uri = `mongodb://${dbConfig.host}/${dbConfig.db}`
// var options = {}
// if (dbConfig.user) {
//   options.user = dbConfig.user
//   options.pass = dbConfig.password
// }
// console.log(uri)
// console.log(options)
// var db = null
// module.exports = () => {
//   db = mongoose.createConnection(uri, options)
//   db.on('error', console.error.bind(console, 'connection error:'));
//   db.once('open', function() {
//     console.log("mongo open")
//   });
// }

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
      process.exit(1)
    }
    console.log("success")
  })
}