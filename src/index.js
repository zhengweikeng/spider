const mongo = require('./utils/mongo')
const type = process.env.type || 'movie'
const nowplaying = require('./lib/movie/nowplaying')

mongo()

switch (type) {
  case 'movie':
    nowplaying()
    break;

  default:
    break;
}