const mongoose = require('mongoose')
const Schema = mongoose.Schema

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

module.exports = mongoose.model('Event', eventSchema)
