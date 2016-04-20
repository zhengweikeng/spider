const mongo = require('./utils/mongo')
const types = process.env.type || 'movie'
const nowplaying = require('./lib/movie/nowplaying')
const collection = require('./lib/movie/collection')

mongo()

const typesArr = types.split(',')
const hubs = typesArr.map((type) => {
  switch (type) {
    case 'movie':
      return collection.crawlTags()

    default:
      return Promise.resolve('finish')
  }
})

Promise.all(hubs)
.then(() => {
  console.log('finish all')
  process.exit(0)
})