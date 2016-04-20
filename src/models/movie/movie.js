const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new Schema({
  mId: String,
  title: String,
  detail_url: String,
  cover: String
})

module.exports = mongoose.model('Movie', MovieSchema)