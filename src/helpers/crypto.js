const NODE_ENV = process.env.NODE_ENV || 'development'
const config = require('../config/config')[NODE_ENV]

/** node_modules */
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { pick } = require('lodash')

const hashString = (plainText) => {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(plainText, salt)
  return hash
}

const jwtSignUser = (user) => {
  const userTrace = pick(user, ['id', 'email', 'username', 'role'])

  return jwt.sign(userTrace, config.authentication.jwtSecret, {
    expiresIn: config.authentication.jwtExpires
  })
}

module.exports = {
  hashString,
  jwtSignUser
}
