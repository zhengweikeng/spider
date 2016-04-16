const cheerio = require('cheerio')
const debug = require('debug')('movie')
const movie = require('./movie')
const DoubanMovie = require('./douban')
const TaobaoMovie = require('./taobao')
const urlServer = require('../../config/url-server')

module.exports = () => {
  const doubanNowplayingUrl = urlServer.douban.movie.nowPlaying
  const taobaoNowplayingUrl = urlServer.taobao.movie.nowPlaying
  return movie.removeMovies({category: 'nowplaying'})
  .then((res) => {
    const douban = new DoubanMovie(doubanNowplayingUrl).nowPlaying()
    const taobao = new TaobaoMovie(taobaoNowplayingUrl).nowPlaying()
    return Promise.all([douban, taobao])
  })
  .then((movies) => {
    movies = movies[0].concat(movies[1])
    return movie.saveMovies(movies)
  })
  .then((res) => console.log(res))
  .catch((err) => debug(err))
}