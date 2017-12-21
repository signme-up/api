const mongoose = require('mongoose')
const Schema = mongoose.Schema
const boom = require('boom')

let eventSchema = new Schema(
  {
    name: {
      type: String
    },
    startdate: {
      type: Date
    },
    logo: {
      type: String
    },
    description: {
      type: String
    },
    organizer : {
      type : String,
      ref: 'User'
    },
  },
  { timestamps: {} } // auto generate createdAt and updatedAt field
)

let Event = mongoose.model('Event', eventSchema)

class EventModel {
  static getEvents(req, res, next) {
    Event.find()
    .then(events =>
      res.status(200).json({
        message: 'Events get success',
        data: events
      })
    )
    .catch(err => next(boom.boomify(err)))
  }

  static getEvent(req, res, next) {
    Event.findById(req.params.id)
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
    req.body.logo = req.file.cloudStoragePublicUrl
    let newEvent = new Event(req.body)
    newEvent.save()
    .then(events => {
      res.status(200).json({
        message: 'Event successfully created',
        data: events
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  static updateEvent(req, res, next) {
    if(req.file){
      req.body.logo = req.file.cloudStoragePublicUrl
    }
    Event.findByIdAndUpdate(
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
  }

  static deleteEvent(req, res, next) {
    Event.findByIdAndRemove(req.params.id)
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

module.exports = EventModel;
