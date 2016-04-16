"use strict"
const cheerio = require('cheerio')
const debug = require('debug')
const request = require('superagent')
var log = null

class Reaction {
  constructor(nowPlayingUrl, source) {
    this.nowPlayingUrl = nowPlayingUrl
    this.source = source
    log = debug(`movie:${source}`)
  }
  
  fetchNowPalying() {
    log(`fetching ${this.source} nowPlaying movie from: ${this.nowPlayingUrl}`)
    return new Promise((resolve, reject) => {
      request
      .get(this.nowPlayingUrl)
      .end((err, res) => {
        log(`fetching ${this.source} nowPlaying movie finish`)
        if (err) {
          return reject(err)
        }  
        return resolve(res.text.toString())
      })
    })
  }
  
  parseNowPlayingHtml(html) {
    log('parseing ${this.source} nowPlaying html...')
    return cheerio.load(html)
  }
  
  nowPlaying() {
    return this.fetchNowPalying()
    .then((html) => this.parseNowPlayingHtml(html))
  }
}

module.exports = Reaction