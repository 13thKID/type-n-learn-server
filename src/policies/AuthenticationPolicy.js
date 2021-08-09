const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email().error(errors => {
        switch (errors[0].code) {
          case 'string.empty':
            res.throwError('The email is required')
            break
          case 'string.base':
            res.throwError('The email must be a string')
            break
          case 'string.email':
            res.throwError('The email must be a valid email address')
            break
          default: res.throwError('The email is invalid')
        }
        return errors
      }),
      username: Joi.string().error(errors => {
        switch (errors[0].code) {
          case 'string.empty':
            res.throwError('The username is required')
            break
          case 'string.base':
            res.throwError('The username must be a string')
            break
          default: res.throwError('The username is invalid')
        }
        return errors
      }),
      password: Joi.string().pattern(
        /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,32}$/
      ).error(errors => {
        switch (errors[0].code) {
          case 'string.empty':
            res.throwError('The password is required')
            break
          case 'string.base':
            res.throwError('The password must be a string')
            break
          case 'string.pattern.base':
            res.throwError('The password must be between 8 and 32 characters long and contain only letters or numbers')
            break
          default: res.throwError('The password is invalid')
        }
        return errors
      }),
      role: Joi.string()
    })

    const { error } = schema.validate(req.body)
    if (!error) next()
  }
}
