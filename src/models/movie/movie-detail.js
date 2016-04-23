const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieDescSchema = new Schema({
  mId: String,
  title: String,
  score: String,
  region: String,
  actors: Array,
  director: String,
  category: String,
  release: Date,
  evaluate_no: Number,
  starts: Array,
})

module.exports = mongoose.model('MovieDetail', MovieDescSchema)