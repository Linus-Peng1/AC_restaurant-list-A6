const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const { name, name_en, category, location, phone, rating, google_map, image, description } = req.body
  if (!name || !name_en || !category || !image || !location || !phone || !google_map || !rating || !description) {
    return res.redirect('/restaurants/new')
  }
  return Restaurant.create({ name, name_en, category, location, phone, rating, google_map, image, description })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, name_en, category, location, phone, rating, google_map, image, description } = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
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

router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

module.exports = router