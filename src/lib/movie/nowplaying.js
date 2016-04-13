const request = require('superagent')
const cheerio = require('cheerio')
const urlServer = require('../../config/url-server')

const fetchNowPalying = () => {
  return new Promise((resolve, reject) => {
    request
    .get(urlServer.douban.movie.nowPlaying)
    .end((err, res) => {
      if (err) {
        return reject(err)
      }  
      return resolve(res)
    })
  })
}

const parseHtml = (html) => {
  const $ = cheerio.load(html)
  const ul = $('#nowplaying .lists')
  // $(ul).children().map((li) => {
    
  // })
  console.log($(ul).children()[0])
}


var http = require('http')


const test = () => {
  const fs = require('fs')
  fs.readFile('./mockdata.html', (err, data) => {
    parseHtml(data)    
  })    
}
test()
