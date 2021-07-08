const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')


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
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/restaurants/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  if (keyword === "") {
    return res.redirect('/')
  }
  Restaurant.find()
    .lean()
    .then((restaurants) => {
      const restaurantSearch = restaurants.filter((item) => {
        return item.name.toLowerCase().includes(keyword) || item.category.toLowerCase().includes(keyword)
      })
      if (restaurantSearch.length) {
        res.render('index', { restaurant: restaurantSearch, keyword })
      } else {
        res.render('index', { noSearchResult: '<h3>沒有符合的搜尋結果</h3>', keyword })
      }
    })
    .catch((error) => console.error(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 設定 port 3000
app.listen(port, () => {
  console.log(`App is running on https://localhost:${port}`)
})