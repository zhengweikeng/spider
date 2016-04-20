const Movie_nowplaying = require('../../models/movie/nowplaying')

exports.saveMovies = (movies) => Movie_nowplaying.create(movies)

exports.removeMovies = (conditions) => Movie_nowplaying.remove(conditions)