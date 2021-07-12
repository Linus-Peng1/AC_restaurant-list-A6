const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')
const sortList = require('../../config/sortList')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant, sortList }))
    .catch(error => console.log(error))
})

module.exports = router