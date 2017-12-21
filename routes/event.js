const router = require('express').Router()

const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/event')

router.get('/', getEvents)
router.post('/', createEvent)
router.get('/:id', getEvent)
router.put('/:id', updateEvent)
router.delete('/:id', deleteEvent)

module.exports = router
