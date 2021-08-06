/** Controllers */
const UserController = require('./controllers/UserController')
const SetController = require('./controllers/SetController')

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
    UserController.auth
  )

  // app.post('/songs',
  //   SongsController.add
  // )
  app.get('/sets',
    authenticateToken,
    SetController.getPublicSets
  )
}
