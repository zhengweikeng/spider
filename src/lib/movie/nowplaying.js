const cheerio = require('cheerio')
const movieModel = require('../../models/douban/movie')
const DoubanMovie = require('./douban')
const TaobaoMovie = require('./taobao')

const saveMovie = (movies) => movieModel.Movie.create(movies)

module.exports = () => {
  // new DoubanMovie().nowPlaying()
  // .then((movies) => {
  //   return saveMovie(movies)
  // })
  // .then((res) => {
  //   console.log(res)
  // })
  // .catch((err) => {
  //   console.log(err)
  // })
  
  new TaobaoMovie().nowPlaying()
}

const test = () => {
  const fs = require('fs')
  fs.readFile('./mockdata.html', (err, data) => {
    const datas = parseDoubanHtml(data)
    saveMovie(datas)    
  })    
}
// test()
