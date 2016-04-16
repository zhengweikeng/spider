"use strict"
const cheerio = require('cheerio')
const urlServer = require('../../config/url-server')
const movieModel = require('../../models/douban/movie')
const debug = require('debug')('movie:douban')
const Reaction = require('./reaction')

class DoubanMovie extends Reaction{
  constructor(nowPlayingUrl) {
    super(nowPlayingUrl, 'douban')
  }
  
  parseNowPlayingHtml(html) {
    const $ = super.parseNowPlayingHtml(html)
    const ul = $('#nowplaying .lists')
    const lists = Array.from($(ul).children())
    return Promise.resolve(lists.map((li) => movieModel.doubanMoive(li.attribs)))
  }
}

module.exports = DoubanMovie