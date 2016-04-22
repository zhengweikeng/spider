"use strict"
const cheerio = require('cheerio')
const urlServer = require('../../../config/url-server')
const debug = require('debug')('movie:douban')
const Reaction = require('./reaction')
const request = require('../../../utils/request')

const doubanMoive = (attribs) => {
  return {
    title: attribs['data-title'],
    score: attribs['data-score'],
    release: attribs['data-release'],
    duration: attribs['data-duration'],
    region: attribs['data-region'],
    director: attribs['data-director'],
    actors: attribs['data-actors'],
    category: attribs['data-category'],
  }
}

class DoubanMovie extends Reaction{
  constructor(nowPlayingUrl) {
    super(nowPlayingUrl, 'douban')
  }
  
  parseNowPlayingHtml(html) {
    const $ = super.parseNowPlayingHtml(html)
    const ul = $('#nowplaying .lists')
    const lists = Array.from($(ul).children())
    return Promise.resolve(lists.map((li) => doubanMoive(li.attribs)))
  }
  
  getTags() {
    const tagUrl = urlServer.douban.movie.tags
    return request.get(tagUrl)
    .then((res) => res.body.tags)
  }
  
  getMovieByTag(tag) {
    const queryUrl = urlServer.douban.movie.movies
    const page_limit = 100
    const page_start = 0
    return request.get(queryUrl, {tag, page_limit, page_start})
    .then((res) => res.body.subjects)
  }
  
  getMovieDetail(mId) {
    const movieDetail = {mId}
    const queryUrl = `${urlServer.douban.movie.detail}/${mId}`
    return request.get(queryUrl)
    .then((res) => {
      const html = res.text.toString()
      const $ = cheerio.load(html)
      
      var str = $('#content #info').text()
      var start = $('#content #info').text().indexOf('地区:') + 3
      var end = $('#content #info').text().indexOf('语言')
      movieDetail.director = str.substring(start, end).trim() 
      console.log(movieDetail.director)
      
      // movieDetail.title = $('#content h1 span').first().text()
      // movieDetail.score = $('#interest_sectl .rating_self strong.rating_num').text()
      // movieDetail.director = $('#content #subject span .attrs a').first().text()
      // movieDetail.actors = []
      // $('#content .actor .attrs span a').each((link) => movieDetail.actors.push($(link).text()))
      // movieDetail.category = $('#content span[property=v:genre]').text()
      // movieDetail.release = $('#content span[property=v:initialReleaseDate]').text().subString(0, 10)
    })
  }
}

module.exports = DoubanMovie