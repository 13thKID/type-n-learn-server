require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV || 'development'
const config = require('./config/config')[NODE_ENV]

/** node_modules */
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

/** models */
const { sequelize } = require('./models')

/** helpers */

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan('combined'))

/* CORS configuration */
app.use(cors(config.cors))

require('./errors')(app)
require('./routes')(app)

sequelize.sync({
  // force: true
})
  .then(() => {
    app.listen(config.port, () => console.log(`Server started http://localhost:${config.port}`))
  })
