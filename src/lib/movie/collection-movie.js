const Tags = require('../../models/movie/tags')
const Movie = require('../../models/movie/movie')
const MovieDetail = require('../../models/movie/movie-detail')

exports.saveTags = (tags) => Tags.create(tags)

exports.findTags = () => Tags.find({})

exports.saveMovies = (movies) => Movie.insertMany(movies)

exports.batchUpdateOrCreate = (movies) => {
  if (!Array.isArray(movies)) {
    movies = [movies]
  }
  const updatePromises = movies.map((movie) => {
    const conditons = {title: movie.title, mId: movie.mId}
    return Movie.update(conditons, movie, {upsert: true})
  })
  return Promise.all(updatePromises)
}

exports.saveManyMovieDetais = (details) => MovieDetail.insertMany(details)

exports.saveMovieDetais = (details) => MovieDetail.save(details)