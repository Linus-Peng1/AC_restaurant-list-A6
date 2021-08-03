const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes/index')
const handlebarsHelpers = require('./utils/handlebarsHelpers')
const usePassport = require('./config/passport') // 載入設定檔，要寫在 express-session 以後

const port = 3000
const app = express()

// 設定 handlebars
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: require('./utils/handlebarsHelpers')
}))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(express.static('public')) // setting static files
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
require('./config/mongoose')

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)

// 設定本地變數 res.locals，所有的 view 都可以存取
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

// 設定路由
app.use(routes)

// 設定 port 3000
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})