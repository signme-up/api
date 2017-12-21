const EventModel = require('../models/event')
const boom = require('boom')

class EventCtrl {
  static getEvents(req, res, next) {
    EventModel.getEvents(req, res, next)
  }

  static getEvent(req, res, next) {
    EventModel.getEvent(req, res, next)
  }

  static createEvent(req, res, next) {
    EventModel.createEvent(req, res, next)
  }

  static updateEvent(req, res, next) {
    EventModel.updateEvent(req, res, next)
  }

  static deleteEvent(req, res, next) {
    EventModel.deleteEvent(req, res, next)
  }
}

module.exports = EventCtrl;
