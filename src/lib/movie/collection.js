const DoubanMovie = require('./source/douban')

exports.crawlTags = () => {
  const douban = new DoubanMovie()
  return douban.getTags()
  .then((tags) => {
    console.log(tags[0])
  })
}