const mongoose = require('mongoose')
const Schema = mongoose.Schema

let guestSchema = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String
    },
    identityurl: {
      type: String
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }
  },
  { timestamps: {} } // auto generate createdAt and updatedAt field
)

module.exports = mongoose.model('Guest', guestSchema)
