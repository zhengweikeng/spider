const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagsSchema = new Schema({
  'name': {
    type: String,
    unique: true
  }
})

module.exports = mongoose.model('tags', tagsSchema)