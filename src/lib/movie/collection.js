const DoubanMovie = require('./source/douban')
const movie = require('./collection-movie')

exports.crawlTags = () => {
  const douban = new DoubanMovie()
  return douban.getTags()
  .then((tags) => {
    tags = tags.map((tag) => ({name: tag}))
    return movie.saveTags(tags)
  })
  .then((tags) => console.log(tags))
}

exports.crawlMovies = () => {
  const douban = new DoubanMovie()
  return movie.findTags({})
  .then((tags) => {
    return tags.map((tag) => douban.getMovieByTag(tag))
  })
  .then((promises) => Promise.all(promises))
  .then((movies) => {
    movies = movies.reduce((prevList, currList) => {
      if (currList && currList.length > 0) {
        return prevList.concat(currList)
      }
      return prevList
    })
    
    movies = movies.map((mv) => {
      return {
        mId: mv.id,
        title: mv.title,
        detail_url: mv.url,
        cover: mv.cover
      }
    })
    
    return movie.saveMovies(movies)
  })
}