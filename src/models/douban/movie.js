const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
  'data-title': String,
  'data-score': String,
  'data-star': String,
  'data-release': String,
  'data-duration': String,
  'data-region': String,
  'data-director': String,
  'data-actors': '',
  'data-category': 'nowplString',
  'data-enough': String,
  'data-showed': String,
  'data-votecount': String,
  'data-subject': String
})

module.exports = mongoose.model('movie', movieSchema)