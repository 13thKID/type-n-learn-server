const config = require('../config/config')

/** node_modules */
const jwt = require('jsonwebtoken')

/** models */
const { User } = require('../models')

/** helpers */
const { jwtSignUser } = require('../helpers/crypto')

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)

      if (!user) {
        res.throwError('user-create-error')
      }

      const token = jwtSignUser(user)

      res.send({
        user: user,
        token: token
      }).cookie(config.cookie.jwt.name, token, config.cookie.jwt.options)
    } catch (err) {
      if (err.errors[0].type === 'unique violation') {
        switch (err.errors[0].path) {
          case 'email':
            res.throwError('user-email-already-used')
            break
          default: res.throwError('user-unknown-error')
        }
      } else {
        return res.throwError('user-unknown-error')
      }
    }
  },
  async login (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })

      if (!user) {
        return res.status(403).send({
          code: 'invalid-email',
          error: 'There is no user with such an email address '
        })
      }

      const isPasswordValid = user.comparePassword(password)
      console.log(`isPasswordValid ${isPasswordValid}`)
      if (!isPasswordValid) {
        return res.status(403).send({
          code: 'invalid-password',
          error: 'The password given is incorrect'
        })
      }

      const token = jwtSignUser(user)

      res.send({
        user: user,
        token: token
      }).cookie(config.cookie.jwt.name, token, config.cookie.jwt.options)
    } catch (err) {
      res.status(500).send({
        code: 'login-unknown-error',
        error: 'An error has occured trying to log in'
      })
    }
  },
  async auth (req, res) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    jwt.verify(token, config.authentication.jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).send({
          error: 'Token is invalid or has expired'
        })
      }

      res.send(user)
    })
  }
}
