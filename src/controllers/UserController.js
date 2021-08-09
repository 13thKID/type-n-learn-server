const NODE_ENV = process.env.NODE_ENV || 'development'
const config = require('../config/config')[NODE_ENV]

/** node_modules */

/** models */
const { User } = require('../models')

/** helpers */
const { jwtSignUser } = require('../helpers/crypto')

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create({
        ...req.body,
        role: 'user'
      })

      if (!user) {
        res.throwError('user-create-error')
      }

      const token = jwtSignUser(user)

      res
        .cookie(config.cookie.jwt.name, token, config.cookie.jwt.options)
        .send({
          user: user,
          token: token
        })
    } catch (err) {
      if (err.errors) {
        const error = err.errors[0]
        if (error.type === 'unique violation') {
          res.throwError(`This ${error.path} is already used. Choose a different one`)
        } else {
          res.throwError('user-register-error')
        }
      } else {
        res.throwError('user-register-error')
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

      res
        .cookie(config.cookie.jwt.name, token, config.cookie.jwt.options)
        .send({
          user: user,
          token: token
        })
    } catch (err) {
      res.status(500).send({
        code: 'login-unknown-error',
        error: 'An error has occured trying to log in'
      })
    }
  },
  async auth (req, res) {
    res.send('Verification was successfull!')
  }
}
