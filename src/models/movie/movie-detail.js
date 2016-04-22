const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieDescSchema = new Schema({
  mId: String,
  title: String,
  score: String,
  evaluate_no: Number,
  starts: Array,
  duration: String,
  region: String,
  director: String,
  actors: String,
  category: String,
  release: Date
})

module.exports = mongoose.model('MovieDesc', MovieDescSchema)