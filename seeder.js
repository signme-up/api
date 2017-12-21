const mongoose = require('mongoose')
const faker = require('faker')
mongoose.connect('mongodb://localhost/signmeupapi', { useMongoClient: true })
mongoose.Promise = global.Promise

let UserModel = require('./models/user')
let GuestModel = require('./models/guest')
let EventModel = require('./models/event')

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function createUsers() {
  let users = []
  for (let i = 0; i < 10; i++) {
    users.push(
      UserModel.create({
        email: faker.internet.email().toLowerCase(),
        password: '12345'
      })
    )
  }
  return Promise.all(users)
}

function createEvents(users) {
  let events = []
  for (const user of users) {
    for (let i = 0; i < randBetween(0, 3); i++) {
      let eventPromise = EventModel.create({
        name: faker.hacker.adjective(),
        logo: 'http://via.placeholder.com/350x150',
        startdate: faker.date.future(),
        organizer: user._id,
        description: faker.commerce.productAdjective()
      })
      events.push(eventPromise)
    }
  }
  return Promise.all(events)
}

function createGuests(events) {
  let guests = []
  for (let i = 0; i < 20; i++) {
    let randEvent = events[randBetween(0, events.length -1)]
    console.log(randEvent._id)
    let guest = GuestModel.create({
      name: faker.name.firstName(),
      email: faker.internet.email().toLowerCase(),
      identityurl: `https://randomuser.me/api/portraits/women/${randBetween(1,40)}.jpg`,
      event: randEvent._id
    })
    guests.push(guest)
  }
  return Promise.all(guests)
}

createUsers()
  .then(organizers => {
    console.log(organizers)
    return createEvents(organizers)
  })
  .then(events => {
    console.log(events)
    return createGuests(events)
  })
  .then(guests => {
    console.log(guests)
    process.exit(1)
  })
  .catch(console.log)
