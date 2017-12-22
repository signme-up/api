const express = require('express')
const router = express.Router();
const Image = require('../helpers/imageHelper')
const Event = require('../controllers/event')
const guestRoute = require('./guest')

router.get('/',  Event.getEvents)
router.post('/', Image.multer.single('logo'), Image.sendUploadToGCS, Event.createEvent)

router.get('/:id', Event.getEvent)
router.put('/:id', Image.multer.single('logo'), Image.sendUploadToGCS, Event.updateEvent)
router.delete('/:id', Event.deleteEvent)
router.use('/:eventId/guests', guestRoute)

module.exports = router
