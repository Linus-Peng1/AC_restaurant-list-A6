const express = require('express')

const port = 3000
const app = express()

// 設定路由
app.get('/', (req, res) => {
  res.send('Restaurant List')
})

// 設定 port 3000
app.listen(port, () => {
  console.log(`App is running on https://localhost:${port}`)
})