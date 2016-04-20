"use strict"
const cheerio = require('cheerio')
const Reaction = require('./reaction')

class TaobaoMovie extends Reaction {
  constructor(nowPlayingUrl) {
    super(nowPlayingUrl, 'taobao')
  }
  
  parseNowPlayingHtml(html) {
    const $ = super.parseNowPlayingHtml(html)
    const movies = []
    
    const movieLists = $('.tab-content .tab-movie-list').first()
    const movieListHtml = $(movieLists).html()
    
    const $$ = cheerio.load(movieListHtml)
    const movieCardList = $$('.movie-card-wrap .movie-card')
    let $$$ = null
    let elemHtml = null
    movieCardList.each((_, movieCard) => {
      const info = {category: 'nowplaying'}
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
}
module.exports = TaobaoMovie