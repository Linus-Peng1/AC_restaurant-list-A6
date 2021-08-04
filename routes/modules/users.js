const express = require('express')
const passport = require('passport')
const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

// 加入 middleware，Passport 提供的 authenticate 方法執行認證
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  // 檢查使用者輸入資料
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ 'message': '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ 'message': '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      name,
      email,
      password,
      confirmPassword,
      errors
    })
  }

  // 檢查使用者是否已經註冊過
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ 'message': '此 eamil 已被註冊過！' })
      res.render('register', {
        name,
        email,
        password,
        confirmPassword,
        errors
      })
    } else {
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
})

router.get('/logout', (req, res) => {
  req.logout() // 為 Passport.js 提供的函式，會幫你清除 session
  req.flash('success_msg', '您已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router