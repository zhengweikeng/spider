const db = {
  development: {
    host: '127.0.0.1',
    port: 27017,
    db: 'spider'  
  },
  production: {
    
  }
  
}

const env = process.env.NODE_ENV || 'development'
module.exports = db[env]