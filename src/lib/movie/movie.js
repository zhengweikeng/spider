const movieModel = require('../../models/douban/movie')

exports.saveMovies = (movies) => movieModel.Movie.create(movies)

exports.removeMovies = (conditions) => movieModel.Movie.remove(conditions)