module.exports = {
  development: {
    port: process.env.PORT || 8081,
    authentication: {
      jwtSecret: process.env.JWT_SECRET || 'secret',
      jwtExpires: 60 * 60 * 24 * 7 // one week
    },
    cookie: {
      jwt: {
        name: 'tnl_jwt',
        options: {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7 // one week
        }
      }
    },
    cors: {
      credentials: true,
      origin: 'http://localhost:8080',
      allowedHeaders: ['Access-Control-Allow-Origin', 'Content-Type'],
      optionsSuccessStatus: 200
    }
  },

  production: {

  }
}
