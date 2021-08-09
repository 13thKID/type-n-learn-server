const NODE_ENV = process.env.NODE_ENV || 'development'
const config = require('../config/config')[NODE_ENV]

/** node_modules */
const jwt = require('jsonwebtoken')

/** models */

/** helpers */

module.exports = {
  authenticateToken (req, res, next) {
    /* As default token is expected to be passed via http-only cookie */
    let token = req.cookies[config.cookie.jwt.name]

    /* It can also be passed as an authorization header */
    if (!token) {
      /* Extracting token from the authentication header */
      const authHeader = req.headers.authorization
      /* Check if the Authorization header is present */
      if (!authHeader) {
        return res.throwError('no-auth-header')
      }
      /* Check if the token is given in the correct form: Bearer <token> */
      if (!authHeader.match(/^Bearer\s.*$/g)) {
        return res.throwError('invalid-auth-header')
      }

      token = authHeader.split(' ')[1] // Bearer <token>
    }

    /* Veryfing token with jwt package */
    jwt.verify(token, config.authentication.jwtSecret, (err, user) => {
      if (err) {
        return res.throwError('invalid-token')
      }
      // res.send(user)
      next()
    })
  }
}
