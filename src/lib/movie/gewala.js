"use strict"
const cheerio = require('cheerio')
const debug = require('debug')('movie:gewala')
const urlServer = require('../../config/url-server')
const Reaction = require('./reaction')

class Gewala extends Reaction{
  constructor(nowPlayingUrl) {
    super(nowPlayingUrl, 'gewala')
  }
  
  parseMovieInfo(html) {
    const $ = super.parseNowPlayingHtml(html)
    const pages = $('#page a')
    const mList = $('.movieList ul .effectLi .ui_media')
    const movies = []
    
    mList.each((_, m) => {
      const $$ = super.parseNowPlayingHtml($(m).html())
      const ps = $$('.ui_text p') 
      if (!ps[ps.length - 2].children[0].data.substring(3)) {
        return
      }
      const info = {source: 'gewala', category: 'nowplaying'}
      info.title = $$('a.ui_movieType').attr('title')
      console.log(info.title)
      info.image = $$('a.ui_movieType img').attr('src')
      info.score = $$('.ui_text .title .grade sub').text() +
        $$('.ui_text .grade sup').text()
        
      Array.from(ps).forEach((p) => {
        console.log(p)
        text = p.children[0].data.substring(0, 2)
        switch (text) {
          case '导演':
            info.director = p.children[0].data.substring(3)   
            break;
          case '类型':
            info.director = p.children[0].data.substring(3)
          case '主演':
            info.actors = p.children[0].data.substring(3)
          case '片长':
            info.duration = p.children[0].data.substring(3)
        }
      })
      
      // info.type = $$('.ui_text p')[1].children[0].data.substring(3)
      // info.duration = $$('.ui_text p')[3].children[0].data.substring(3)
      // info.director = $$('.ui_text p')[4].children[0].data.substring(3)
      // info.actors = $$('.ui_text p')[5].children[0].data.substring(3)
      movies.push(info)
    })
    return {movies, pages}
  }
  
  parseNowPlayingHtml(html) {
    let i = 1
    const promises = []
    const moviesInfo = this.parseMovieInfo(html)
    
    while(i < moviesInfo.pages.length - 1) {
      const promise = this.fetchNowPalying(`${this.nowPlayingUrl}?pageNo=${i++}`)
      .then((nextPageHtml) => {
        return this.parseMovieInfo(nextPageHtml).movies
      })
      promises.push(promise)
    }
    return Promise.all(promises)
    .then((movies) => {
      console.log("fff")
      let movieList = movies[0] ? movies[0] : []
      for (let index = 0; index < movies.length; index++) {
        if (movies[1]) {
          movieList = movieList.concat(movies[index])
        }
      }
      movieList.unshift(moviesInfo.movies)
      return movieList
    })
    .catch((err) => {
      console.log(err)
    })
  }
  
}

module.exports = Gewala