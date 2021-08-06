module.exports = {
  port: process.env.PORT || 8081,
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    jwtExpires: 60 * 60 * 24 * 7 // one week
  },
  cookie: {
    jwt: {
      name: 'tnl',
      options: {
        httpOnly: true,
        expires: 60 * 60 * 24 * 7 // one week
      }
    }
  }
}
