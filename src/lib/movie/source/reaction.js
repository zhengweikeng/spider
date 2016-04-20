"use strict"
const cheerio = require('cheerio')
const debug = require('debug')
const request = require('../../../utils/request')
var log = null

class Reaction {
  constructor(nowPlayingUrl, source) {
    this.nowPlayingUrl = nowPlayingUrl
    this.source = source
    log = debug(`movie:${source}`)
  }
  
  fetchNowPalying(url) {
    if (!url) {
      url = this.nowPlayingUrl
    }
    log(`fetching ${this.source} nowPlaying movie from: ${url}`)
    return request.get(url).then((res) => res.text.toString(), (err) => reject(err))
  }
  
  parseNowPlayingHtml(html) {
    log(`parseing ${this.source} nowPlaying html...`)
    return cheerio.load(html)
  }
  
  nowPlaying() {
    return this.fetchNowPalying()
    .then((html) => this.parseNowPlayingHtml(html))
  }
}

module.exports = Reaction