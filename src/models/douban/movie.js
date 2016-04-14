const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
  'title': String,
  'score': String,
  'star': String,
  'release': String,
  'duration': String,
  'region': String,
  'director': String,
  'actors': String,
  'category': String,
  'votecount': String,
})

module.exports = mongoose.model('Movie', movieSchema)