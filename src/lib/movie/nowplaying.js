const debug = require('debug')('movie')
const movie = require('./nowplaying-movie')
const DoubanMovie = require('./source/douban')
const TaobaoMovie = require('./source/taobao')
const MeituanMovie = require('./source/meituan')
const urlServer = require('../../config/url-server')

module.exports = () => {
  const doubanNowplayingUrl = urlServer.douban.movie.nowPlaying
  const taobaoNowplayingUrl = urlServer.taobao.movie.nowPlaying
  const meituanNowplayingUrl = urlServer.meituan.movie.nowPlaying
  return movie.removeMovies({category: 'nowplaying'})
  .then((res) => {
    const douban = new DoubanMovie(doubanNowplayingUrl).nowPlaying()
    const taobao = new TaobaoMovie(taobaoNowplayingUrl).nowPlaying()
    const meituan = new MeituanMovie(meituanNowplayingUrl).nowPlaying()
    return Promise.all([
      douban, 
      taobao, 
      meituan
    ])
  })
  .then((movies) => {
    const initArr = movies[0] ? movies[0] : []
    movies.shift()
    movies = movies.reduce((prevList , currList) => {
      if (currList && currList.length > 0) {
        return prevList.concat(currList)
      }
      return prevList
    }, initArr)
    return movie.saveMovies(movies)
  })
  .then((res) => console.log(res))
  .catch((err) => debug(err))
}