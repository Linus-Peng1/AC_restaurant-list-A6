const express = require('express')
const mongoose = require('mongoose')


const port = 3000
const app = express()

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

// 設定路由
app.get('/', (req, res) => {
  res.send('Restaurant List')
})

// 設定 port 3000
app.listen(port, () => {
  console.log(`App is running on https://localhost:${port}`)
})