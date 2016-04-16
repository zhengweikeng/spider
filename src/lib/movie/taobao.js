"use strict"
const cheerio = require('cheerio')
const request = require('superagent')
const debug = require('debug')('movie:taobao')
const urlServer = require('../../config/url-server')

class TaobaoMovie {
  parseNowPlayingHtml(html) {
    debug('parseing nowPlaying html...')
    const movies = []
    
    const $ = cheerio.load(html)
    const movieLists = $('.tab-content .tab-movie-list').first()
    const movieListHtml = $(movieLists).html()
    
    const $$ = cheerio.load(movieListHtml)
    const movieCardList = $$('.movie-card-wrap .movie-card')
    let $$$ = null
    let elemHtml = null
    movieCardList.each((_, movieCard) => {
      const info = {source: 'taobao', category: 'nowplaying'}
      movieCard.children.forEach((elem) =>{
        if (elem.name === 'div') {
          const elemHtml = $$(elem).html()
          $$$ = cheerio.load(elemHtml)
        }
        if (elem.attribs && elem.attribs.class === 'movie-card-poster') {
          info.image = $$$('img').attr('src')
        } 
        if (elem.attribs && elem.attribs.class === 'movie-card-name') {
          info.title = $$$('span.bt-l').text()
          info.score = $$$('span.bt-r').text()
        } 
        if (elem.attribs && elem.attribs.class === 'movie-card-info') {
          info.director = $$$('span')['0'].children[0].data.substring(3)
          info.actors = $$$('span')['1'].children[0].data.substring(3)
          info.type = $$$('span')['2'].children[0].data.substring(3)
          info.region = $$$('span')['3'].children[0].data.substring(3)
          info.duration = $$$('span')['5'].children[0].data.substring(3)
        } 
      })
      movies.push(info)
    })
    return Promise.resolve(movies)
  }
  
  fetchNowPalying() {
    debug(`fetching taobao nowPlaying movie from: ${urlServer.taobao.movie.nowPlaying}`)
    return new Promise((resolve, reject) => {
      request
      .get(urlServer.taobao.movie.nowPlaying)
      .end((err, res) => {
        debug(`fetching taobao nowPlaying movie finish`)
        if (err) {
          return reject(err)
        }  
        return resolve(res.text.toString())
      })
    })
  }
  
  nowPlaying() {
    return this.fetchNowPalying()
    .then((html) => this.parseNowPlayingHtml(html))
  }
}
module.exports = TaobaoMovie