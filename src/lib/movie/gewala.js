"use strict"
const cheerio = require('cheerio')
const debug = require('debug')('movie:gewala')
const urlServer = require('../../config/url-server')
const Reaction = require('./reaction')

class Gewala extends Reaction{
  constructor(nowPlayingUrl) {
    super(nowPlayingUrl, 'gewala')
  }
  
  parseNowPlayingHtml(html) {
    // super.parseNowPlayingHtml(html)
  }
}