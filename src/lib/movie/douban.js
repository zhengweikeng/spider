"use strict"
const cheerio = require('cheerio')
const request = require('superagent')
const urlServer = require('../../config/url-server')
const movieModel = require('../../models/douban/movie')

class DoubanMovie {
  parseNowPlayingHtml(html) {
    const $ = cheerio.load(html)
    const ul = $('#nowplaying .lists')
    const lists = Array.from($(ul).children())
    return Promise.resolve(lists.map((li) => movieModel.doubanMoive(li.attribs)))
  }
  
  fetchNowPalying() {
    return new Promise((resolve, reject) => {
      request
      .get(urlServer.douban.movie.nowPlaying)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }  
        return resolve(res.text)
      })
    })
  }
  
  nowPlaying() {
    return this.fetchNowPalying()
    .then((html) => this.parseNowPlayingHtml(html))
  }
}

module.exports = DoubanMovie