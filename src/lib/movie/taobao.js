"use strict"
const cheerio = require('cheerio')
const request = require('superagent')
const urlServer = require('../../config/url-server')

class TaobaoMovie {
  parseNowPlayingHtml(html) {
    const movies = []
    const $ = cheerio.load(html, {ignoreWhitespace: true, xmlMode: true})
    const ul = $('.tab-content .tab-movie-list').first()
    const lists = Array.from(ul)[0]
    const elems = lists.children
    const divs = elems.filter((elem) => {
      if (elem.name === 'div') {
        return elem
      }
    })
    divs.forEach((div) => {
      const links = div.children.filter((elem) => {
        if (elem.name === 'a') {
          return elem
        }
      })
      const movieDivs = links[0].children.filter((elem) => {
        if (elem.name === 'div') {
          return elem
        }
      })
      const poster = movieDivs[1].children
      const src = poster[1].attribs['src']
      
      const name = movieDivs[2].children
      var movieName = ''
      var movieScore = ''
      name.forEach((n) => {
        if (n.name === 'span') {
          if (n.attribs.class === 'bt-l') {
            return movieName = n.children[0].data
          }
          movieScore = n.children[0].data
        }
      })
      console.log(movieName)
      
      const info = movieDivs[3].children
      // console.log(info.length)
      info.forEach((i) => {
        console.log(i.name)
        // if (i.attribs.name === 'span') {
        //   console.log(i.name)
        // }  
      })
    })
    
    // return Promise.resolve(lists.map((li) => movieModel.doubanMoive(li.attribs)))
  }
  
  fetchNowPalying() {
    console.log(urlServer.taobao.movie.nowPlaying)
    return new Promise((resolve, reject) => {
      request
      .get(urlServer.taobao.movie.nowPlaying)
      .end((err, res) => {
        if (err) {
          // console.log(err)
          return reject(err)
        }  
        // console.log(res)
        return resolve(res.text)
      })
    })
  }
  
  nowPlaying() {
    return this.fetchNowPalying()
    .then((html) => this.parseNowPlayingHtml(html))
  }
}
module.exports = TaobaoMovie