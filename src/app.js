const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { sequelize } = require('./models')
const config = require('./config/config.js')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080',
  allowedHeaders: ['Access-Control-Allow-Origin', 'Content-Type'],
  optionsSuccessStatus: 200
}))

require('./errors')(app)
require('./routes')(app)

sequelize.sync({
  // force: true
})
  .then(() => {
    app.listen(config.port, () => console.log(`Server started http://localhost:${config.port}`))
  })
