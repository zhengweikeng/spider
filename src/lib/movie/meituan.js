"use strict"
const Reaction = require('./reaction')
const cheerio = require('cheerio')

class Meituan extends Reaction {
  constructor(nowPlayingUrl) {
    super(nowPlayingUrl, 'meituan')
  }
  parseNowPlayingHtml(html) {
    const $ = super.parseNowPlayingHtml(html)
    const movies = []
    const movieCells = $('#content .movies-container .movie-cell')
    movieCells.each((_, cell)=> {
      const info = {source: 'meituan', category: 'nowplaying'}
      const $$ = cheerio.load($(cell).html())
      info.image = $$('.movie-cell__cover img').attr('src')
      info.title = $$('.movie-cell__title a').text()
      info.score = $$('.movie-cell__detail .rates').text()
      
      movies.push(info)
    })
    return movies
  }
}

module.exports = Meituan