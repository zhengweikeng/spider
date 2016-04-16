const cheerio = require('cheerio')
const debug = require('debug')('movie')
const movie = require('./movie')
const DoubanMovie = require('./douban')
const TaobaoMovie = require('./taobao')

module.exports = () => {
  movie.removeMovies({category: 'nowplaying'})
  .then((res) => {
    const douban = new DoubanMovie().nowPlaying()
    const taobao = new TaobaoMovie().nowPlaying()
    return Promise.all([douban, taobao])
  })
  .then((movies) => {
    movies = movies[0].concat(movies[1])
    return movie.saveMovies(movies)
  })
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    debug(err)
  })
  
}