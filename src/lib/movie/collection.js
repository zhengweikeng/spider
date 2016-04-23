const DoubanMovie = require('./source/douban')
const movie = require('./collection-movie')
const debug = require('debug')('movie')
const _ = require('lodash')
const aysnc = require('async')

const crawlMoviesDetail = (index, mIdsChunk) => {
  if (index >= mIdsChunk.length) {
    return
  }
  console.log(`current index: ${index}`)
  const promises = []
  mIdsChunk[index].forEach((mId) => {
    promises.push(douban.getMovieDetail(mId))
  })
  
  return Promise.all(promises)
  .then((details) => movie.saveManyMovieDetais(details))
  .then((res) => {
    console.log(res)
    return crawlMoviesDetail(++index, mIdsChunk)
  })
  .then(() => {
    console.log('saved')
  })
  .catch((err) => {
    console.log(err)
  })
  
}

const douban = new DoubanMovie()
exports.crawlTags = () => {
  return douban.getTags()
  .then((tags) => {
    tags = tags.map((tag) => ({name: tag}))
    return movie.saveTags(tags)
  })
  .then((tags) => console.log(tags))
}

exports.crawlMovies = () => {
  return movie.findTags({})
  .then((tags) => tags.map((tag) => douban.getMovieByTag(tag.name)))
  .then((promises) => Promise.all(promises))
  .then((movies) => {
    movies = movies.reduce((prevList, currList) => {
      if (currList && currList.length > 0) {
        return prevList.concat(currList)
      }
      return prevList
    }, [])
    
    const mIds = []
    movies = movies.map((mv) => {
      mIds.push(mv.id)
      return {
        mId: mv.id,
        title: mv.title,
        detail_url: mv.url,
        cover: mv.cover
      }
    })
    
    const mIdsChunk = _.chunk(mIds, 10)
    console.log(mIdsChunk.length)
    
    return movie.batchUpdateOrCreate(movies).then((res) => {
      debug(res)
      return res     
    }).then(() => crawlMoviesDetail(0, mIdsChunk))
  })
}

exports.crawlMovies2 = () => {
  return movie.findTags({}).then((tags) => {
    console.log(tags)
    tags.forEach((tag) => {
      console.log('currtag is: ' + tag)
      douban.getMovieByTag(tag.name)
      .then((movies) => {
        console.log('the movies: ' + movies)
        const mIds = []
        movies = movies.map((mv) => {
          mIds.push(mv.id)
          return {
            mId: mv.id,
            title: mv.title,
            detail_url: mv.url,
            cover: mv.cover
          }
        })
        return movie.batchUpdateOrCreate(movies)
        .then((res) => {
          debug(res)
          return mIds     
        })
      })
      .then((mIds) => {
        crawlMoviesDetail(mIds)
      })
      
    })
  })
}

