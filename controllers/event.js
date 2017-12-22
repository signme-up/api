const Event = require('../models/event')
const boom = require('boom')

class EventCtrl {
  static getEvents(req, res, next) {
    Event.find({
      organizer : req.userId
    })
    .populate('organizer')
    .then(events =>
      res.status(200).json({
        message: 'Events get success',
        data: events
      })
    )
    .catch(err => next(boom.boomify(err)))
  }

  static getEvent(req, res, next) {
    Event.findOne({
      _id : req.params.id,
      organizer : req.userId
    })
    .populate('organizer')
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
  }

  static createEvent(req, res, next) {
    Event.create({
      name: req.body.name,
      startdate: req.body.startdate,
      logo: req.file.cloudStoragePublicUrl,
      description: req.body.description,
      organizer : req.userId
    })
    .populate('organizer')
    .then(event => {
      res.status(200).json({
        message: 'Event successfully created',
        data: event
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  static updateEvent(req, res, next) {
    console.log('kesini', req.userId)
    Event.findOneAndUpdate(
      {
        _id : req.params.id,
        organizer : req.userId
      },
      {
        name: req.body.name,
        startdate: req.body.startdate,
        logo: req.file.cloudStoragePublicUrl,
        description: req.body.description
      },
      { new: true } // return new updated document
    )
    .populate('organizer')
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
  }

  static deleteEvent(req, res, next) {
    Event.findOneAndRemove({
      _id : req.params.id,
      organizer : req.userId
    })
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

module.exports = EventCtrl;
