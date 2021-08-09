/** Controllers */
const UserController = require('./controllers/UserController')
const SetController = require('./controllers/SetController')
const TestController = require('./controllers/TestController')

/** Policies */
const AuthenticationPolicy = require('./policies/AuthenticationPolicy')

/** Middleware */
const { authenticateToken } = require('./middleware/Auth')

module.exports = (app) => {
  app.post('/register',
    AuthenticationPolicy.register,
    UserController.register
  )

  app.post('/login',
    UserController.login
  )

  app.post('/auth',
    authenticateToken,
    UserController.auth
  )

  app.get('/sets',
    // authenticateToken,
    SetController.getPublicSets
  )

  app.post('/sets',
    SetController.addSet
  )

  app.get('/test',
    TestController.testGet
  )
}
