const express = require('express')
const router = express.Router();
const Image = require('../helpers/imageHelper')
const Event = require('../controllers/event')
const guestRoute = require('./guest')

const {
  getGuests,
  getGuest,
  createGuest,
  updateGuest,
  deleteGuest
} = require('../controllers/guest')


// router.use('/:eventId/guests', guestRoute)
router.get('/',  Event.getEvents)
router.post('/', Image.multer.single('logo'), Image.sendUploadToGCS, Event.createEvent)

router.get('/:id', Event.getEvent)
router.put('/:id', Image.multer.single('logo'), Image.sendUploadToGCS, Event.updateEvent)
router.delete('/:id', Event.deleteEvent)

router.get('/:eventId/guests', getGuests)
router.post('/:eventId/guests', createGuest)
router.get('/:eventId/guests/:id', getGuest)
router.put('/:eventId/guests/:id', updateGuest)
router.delete('/:eventId/guests/:id', deleteGuest)



module.exports = router
