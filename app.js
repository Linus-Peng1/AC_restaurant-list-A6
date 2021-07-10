const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes/index')

const port = 3000
const app = express()

// 設定 handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public')) // setting static files
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
require('./config/mongoose')

// 設定路由
app.use(routes)

// 設定 port 3000
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})