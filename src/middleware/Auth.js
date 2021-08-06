const config = require('../config/config')

/** node_modules */
const jwt = require('jsonwebtoken')

/** models */

/** helpers */

module.exports = {
  authenticateToken (req, res, next) {
    /* Extracting token from the authentication header */
    const authHeader = req.headers.authorization
    /* Check if the Authorization header is present */
    if (!authHeader) {
      return res.throwError('no-auth-header')
    }
    /* Check if the token is given in the correct form: Bearer <token> */
    // if (!authHeader.match(/^Bearer\s.{377}$/g)) {
    //   return res.throwError('invalid-auth-header')
    // }

    const token = authHeader.split(' ')[1]
    /* Veryfing token with jwt package */
    jwt.verify(token, config.authentication.jwtSecret, (err, user) => {
      if (err) {
        return res.throwError('invalid-token')
      }
      res.send(user)
    })
  }
}
