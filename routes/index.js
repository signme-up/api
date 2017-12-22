const router = require('express').Router()

const authentication = require('../middlewares/authentication')

router.get('/', function(req, res, next) {
  res.status(200).json({
    message : 'This is API index route',
    data : 'OK'
  })
})

router.use('/users', require('./user'))
router.use('/events', authentication, require('./event'))
// router.use('/guests', require('./guest'))
router.use('/auth', require('./auth'))

module.exports = router
