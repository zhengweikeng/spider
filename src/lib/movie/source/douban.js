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
    const page_limit = 3
    const page_start = 0
    return request.get(queryUrl, {tag, page_limit, page_start})
    .then((res) => res.body.subjects)
  }
}

module.exports = DoubanMovie