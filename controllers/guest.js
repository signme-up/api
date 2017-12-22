const GuestModel = require('../models/guest')
const boom = require('boom')

module.exports = {
  getGuests: function(req, res, next) {
    console.log('eventId---->', req.params.eventId)
    GuestModel.find({
      event: req.params.eventId
    })
      .then(guests =>{
        console.log('guests',guests)
        res.status(200).json({
          message: 'Guests get success',
          data: guests
        })
      }
      )
      .catch(err => next(boom.boomify(err)))
  },
  getGuest: function(req, res, next) {
    GuestModel.findOne({
      _id: req.params.id,
      event: req.params.eventId
    })
      .then(guest => {
        if (guest) {
          res.status(200).json({
            message: 'Guest get success',
            data: guest
          })
        } else {
          res.status(404).json({
            message: 'Guest not found'
          })
        }
      })
      .catch(err => next(boom.boomify(err)))
  },
  createGuest: function(req, res, next) {
    GuestModel.create({
      name: req.body.name,
      email: req.body.email,
      identityurl: req.body.identityurl,
      event: req.params.id
    })
      .then(guest => {
        res.status(200).json({
          message: 'Guest successfully created',
          data: guest
        })
      })
      .catch(err => next(boom.boomify(err)))
  },
  updateGuest: function(req, res, next) {
    GuestModel.findOneAndUpdate(
      {
        _id: req.params.id,
        event: req.params.eventId
      },
      {
        name: req.body.name,
        email: req.body.email,
        identityurl: req.body.identityurl,
        event: req.body.event
      },
      {new: true} // return new updated document
    )
      .then(guest => {
        if (guest) {
          res.status(200).json({
            message: 'Guest successfully updated',
            data: guest
          })
        } else {
          res.status(404).json({
            message: 'Guest not found'
          })
        }
      })
      .catch(err => next(boom.boomify(err)))
  },
  deleteGuest: function(req, res, next) {
    GuestModel.findOneAndRemove({
      _id: req.params.id,
      event: req.params.eventId
    })
      .then(guest => {
        if (guest) {
          res.status(200).json({
            message: 'Guest successfully deleted',
            data: guest
          })
        } else {
          res.status(404).json({
            message: 'Guest not found'
          })
        }
      })
      .catch(err => next(boom.boomify(err)))
  }
}
