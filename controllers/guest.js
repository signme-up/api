const GuestModel = require('../models/guest')
const boom = require('boom')

module.exports = {
  getGuests: function(req, res, next) {
    GuestModel.find()
      .then(guests =>
        res.status(200).json({
          message: 'Guests get success',
          data: guests
        })
      )
      .catch(err => next(boom.boomify(err)))
  },
  getGuest: function(req, res, next) {
    GuestModel.findById(req.params.id)
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
    let newGuest = new GuestModel({
      name: req.body.name,
      email: req.body.email,
      identityurl: req.body.identityurl,
      event: req.body.event
    })
    newGuest
      .save()
      .then(guest => {
        res.status(200).json({
          message: 'Guest successfully created',
          data: guest
        })
      })
      .catch(err => next(boom.boomify(err)))
  },
  updateGuest: function(req, res, next) {
    GuestModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        identityurl: req.body.identityurl,
        event: req.body.event
      },
      { new: true } // return new updated document
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
    GuestModel.findByIdAndRemove(req.params.id)
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
