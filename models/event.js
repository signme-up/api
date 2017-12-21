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
      type : Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  { timestamps: {} } // auto generate createdAt and updatedAt field
)

let EventModel = mongoose.model('Event', eventSchema)


module.exports = EventModel;
