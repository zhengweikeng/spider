const Tags = require('../../models/movie/tags')
const Movie = require('../../models/movie/movie')

exports.saveTags = (tags) => Tags.create(tags)

exports.findTags = () => Tags.find({})

exports.saveMovies = (movies) => Movie.create(movies)