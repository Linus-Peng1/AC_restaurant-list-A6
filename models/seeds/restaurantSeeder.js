const Restaurant = require('../restaurant') // 載入 restaurant model
const restaurants = require('./restaurant.json') // 載入 restaurant.json
const db = require('../../config/mongoose')

db.once('open', () => {
  restaurants.results.forEach((restaurant) => {
    Restaurant.create({
      id: restaurant.sourceId,
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description
    })
  })
  console.log('seeder done!')

})