const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string().pattern(
        /^[a-zA-z0-9]{8,32}$/
      )
    })

    const { error } = schema.validate(req.body)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: 'Your password must contain characters a-z, A-Z or 0-9 and be between 8 and 32 characters long'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration data'
          })
      }
    } else {
      next()
    }
  }
}
