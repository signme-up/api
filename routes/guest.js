const router = require('express').Router()

const {
  getGuests,
  getGuest,
  createGuest,
  updateGuest,
  deleteGuest
} = require('../controllers/guest')

router.get('/', getGuests)
router.post('/', createGuest)
router.get('/:id', getGuest)
router.put('/:id', updateGuest)
router.delete('/:id', deleteGuest)

module.exports = router
