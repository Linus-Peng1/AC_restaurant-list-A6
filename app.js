const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')


const port = 3000
const app = express()

// 資料庫連線設定
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 設定 handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))

// 設定路由
app.get('/', (req, res) => {
  res.render('index')
})

// 設定 port 3000
app.listen(port, () => {
  console.log(`App is running on https://localhost:${port}`)
})