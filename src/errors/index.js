const stripJsonComments = require('strip-json-comments')
const fs = require('fs')
const path = require('path')

let errorCodes
try {
  const data = fs.readFileSync(path.join(__dirname, '../errors/codes.json'), 'utf8')
  errorCodes = JSON.parse(stripJsonComments(data))
} catch (err) {
  console.log(new Error('Error codes could not be imported'))
  console.log(err)
}

module.exports = (app) => {
  app.response.throwError = function (code) {
    if (errorCodes[code]) {
      const errorObject = errorCodes[code]
      this.status(errorObject.status).send({
        error: code,
        message: errorObject.message
      })
    } else {
      console.log(new Error('Unknown error code'))
    }
  }
}
