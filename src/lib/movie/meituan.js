"use strict"
const Reaction = require('./reaction')

class Meituan extends Reaction {
  constructor(nowPlayingUrl) {
    super(nowPlayingUrl, 'meituan')
  }
  parseNowPlayingHtml(html) {
    
  }
}

module.exports = Meituan