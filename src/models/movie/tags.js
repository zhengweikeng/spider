const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagsSchema = new Schema({
  'name': String
})

module.exports = mongoose.model('tags', tagsSchema)