const EventModel = require('../models/event')
const boom = require('boom')

module.exports = {
  getEvents: function(req, res, next) {
    EventModel.find()
      .then(events =>
        res.status(200).json({
          message: 'Events get success',
          data: events
        })
      )
      .catch(err => next(boom.boomify(err)))
  },
  getEvent: function(req, res, next) {
    EventModel.findById(req.params.id)
      .then(event => {
        if (event) {
          res.status(200).json({
            message: 'Event get success',
            data: event
          })
        } else {
          res.status(404).json({
            message: 'Event not found'
          })
        }
      })
      .catch(err => next(boom.boomify(err)))
  },
  createEvent: function(req, res, next) {
    let newEvent = new EventModel({
      name: req.body.name,
      startdate: req.body.startdate,
      logo: req.body.logo,
      description: req.body.description
    })
    newEvent
      .save()
      .then(event => {
        res.status(200).json({
          message: 'Event successfully created',
          data: event
        })
      })
      .catch(err => next(boom.boomify(err)))
  },
  updateEvent: function(req, res, next) {
    EventModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        startdate: req.body.startdate,
        logo: req.body.logo,
        description: req.body.description
      },
      { new: true } // return new updated document
    )
      .then(event => {
        if (event) {
          res.status(200).json({
            message: 'Event successfully updated',
            data: event
          })
        } else {
          res.status(404).json({
            message: 'Event not found'
          })
        }
      })
      .catch(err => next(boom.boomify(err)))
  },
  deleteEvent: function(req, res, next) {
    EventModel.findByIdAndRemove(req.params.id)
      .then(event => {
        if (event) {
          res.status(200).json({
            message: 'Event successfully deleted',
            data: event
          })
        } else {
          res.status(404).json({
            message: 'Event not found'
          })
        }
      })
      .catch(err => next(boom.boomify(err)))
  }
}
