const express = require('express')
const router = express.Router()
const knex = require('../knex')



// Middleware Functions
// Verifies the ID is a number
const verifyId = (req, res, next) => {
  let {
    id
  } = req.params
  if (isNaN(id)) {
    let err = new Error()
    err.status = 401
    err.message = `Not a valid ID`
    next(err)
  } else {
    next()
  }
}

// Verifies that all required information is present before the post is sent.
const verifyBody = (req, res, next) => {
  let {
    eventName,
    platform_id,
    host_id,
    start,
    end,
    privacy
  } = req.body
  if (!eventName || !platform_id || !host_id || !start || !end || !privacy) {
    let err = new Error()
    err.status = 400
    err.message = `Bad POST Request`
    next(err)
  } else {
    next()
  }
}

const verifyUser = (req, res, next) => {
  // This needs to make sure the user trying to delete the event is the user who is hosting the event. For now its just a placeholder.
  next()
}

//Working this Middleware. Basic logic below, but need to test/get working
// const checkForDuplicateEvents = (req, res, next) => {
//   console.log('CHECK DUPLICATE EVENTS Middleware>>>>');
//   //Filter events to a list for a particular day
//   let requestDate = req.body.start.toString()
//   requestDate = requestDate.substring(0, 10)
//   //Logic for below: search events that have a start time betwen the begging of the request date and the end of the request date
//   knex('events')
//   .where(knex.raw('select * from "events" where "start" > `${requestDate}T00:00:00Z` and "start" < `${requestDate}T24:24:24Z`'))
//   .then((data) => {
//     if(data) {
//       console.log('Already an EVENT FOR THAT DAY');
//     }
//   })
//   //Search the host_id for the events on that day to see if the user already has created an event for that date
//
//   //If the user already has event, don't let them create a new ONE
//
//   //If the user does not already have an event, let them create an event
//
//   //This should at least check to see if a user is already hosting an event on that particular day. For now it's just a placeholder.
//   next()
// }
// READ ALL records for events
router.get('/', (req, res, next) => {
  knex('events')
    .then((rows) => {
      res.json(rows)
    })
    .catch((err) => {
      next(err)
    })
})

// READ ONE record for this events
router.get('/:id', verifyId, (req, res, next) => {
  knex('events')
    .where('id', req.params.id).first()
    .then((row) => {
      res.json(row)
    })
    .catch((err) => {
      next(err)
    })
})

// CREATE ONE record for this events
router.post('/', verifyBody, (req, res, next) => {
  knex('events')
    .insert({
      "eventName": req.body.eventName,
      "platform_id": req.body.platform_id,
      "host_id": req.body.host_id,
      "address": req.body.address,
      "city": req.body.city,
      "zip": req.body.zip,
      "link": req.body.link,
      "start": req.body.start,
      "end": req.body.end,
      "description": req.body.description,
      "playerLimit": req.body.playerLimit,
      "ageLimit": req.body.ageLimit,
      "privacy": req.body.privacy
    })
    .returning('*')
    .then((data) => {
      res.json(data[0])
    })
    .catch((err) => {
      next(err)
    })
})

// EDIT event
router.put('/:id', verifyId, verifyUser, (req, res, next) => {
  knex('events')
    .where('id', req.params.id)
    .then((data) => {
      knex('events')
        .where('id', req.params.id)
        .limit(1)
        .update({
          "eventName": req.body.eventName,
          "platform_id": req.body.platform_id,
          "host_id": req.body.host_id,
          "address": req.body.address,
          "city": req.body.city,
          "zip": req.body.zip,
          "link": req.body.link,
          "date": req.body.date,
          "start": req.body.start,
          "end": req.body.end,
          "description": req.body.description,
          "playerLimit": req.body.playerLimit,
          "ageLimit": req.body.ageLimit,
          "privacy": req.body.privacy
        })
        .returning('*')
        .then((data) => {
          res.json(data[0])
        })
    })
    .catch((err) => {
      next(err)
    })
})

// DELETE event
router.delete('/:id', verifyId, verifyUser, (req, res, next) => {
  knex('events')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if (!row) return next()
      knex('events')
        .del()
        .where('id', req.params.id)
        .then(() => {
          res.send(`Event ID ${req.params.id} Deleted`)
        })
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
