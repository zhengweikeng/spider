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
  'source': String,
  'image': String
})

exports.Movie = mongoose.model('movie', movieSchema)

exports.doubanMoive = (attribs) => {
  return {
    title: attribs['data-title'],
    score: attribs['data-score'],
    star: attribs['data-star'],
    release: attribs['data-release'],
    duration: attribs['data-duration'],
    region: attribs['data-region'],
    director: attribs['data-director'],
    actors: attribs['data-actors'],
    category: attribs['data-category'],
    votecount: attribs['data-votecount'],
    source: 'douban'
  }
}