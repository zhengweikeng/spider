const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
  'title': String,
  'score': String,
  'release': String,
  'duration': String,
  'region': String,
  'director': String,
  'actors': String,
  'category': String,
  'source': String,
  'image': String,
  'type': String
})

module.exports = mongoose.model('movie_nowplaying', movieSchema)