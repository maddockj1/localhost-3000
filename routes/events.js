const express = require('express')
const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')



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

const jwtVerify = (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, _payload) => {
    if (err) {
      err.status = 401
      err.message = 'Unauthorized'
      return next(err);
    } else {
      req.payload = _payload
      next()
    }
  })
}

const checkForDuplicateEvents = (req, res, next) => {
  // This should at least check to see if a user is already hosting an event on that particular day. For now it's just a placeholder.
  next()
}

const addHostToEvent = (data) => {
  knex('events_users')
    .insert({
      events_id: data.event_id,
      users_id: data.user_id
    })
    .returning('*')
    .catch((err) => {
      next(err)
    })
}

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
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if (!row) {
        let err = new Error()
        err.status = 404
        err.message = "Event not found"
        return next(err)
      } else {
        res.json(row)
      }
    })
    .catch((err) => {
      next(err)
    })
})

// CREATE ONE record for this events
router.post('/', verifyBody, jwtVerify, (req, res, next) => {
  knex('events')
    .insert({
      "eventName": req.body.eventName,
      "platform_id": req.body.platform_id,
      "host_id": req.payload.id,
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
      // addHostToEvent(data)
      res.json(data[0])
    })
    .catch((err) => {
      next(err)
    })
})

// EDIT event
router.put('/:id', verifyId, jwtVerify, (req, res, next) => {
  knex('events')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if (!row) {
        let err = new Error()
        err.status = 404
        err.message = "Event not found"
        return next(err)
      }
      if (req.payload.id !== row.host_id) {
        let err = new Error()
        err.status = 401
        err.message = "You may only edit your own events"
        return next(err)
      }
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
router.delete('/:id', verifyId, jwtVerify, (req, res, next) => {
  knex('events')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if (!row) return next()
      if (!req.payload) {
        let err = new Error()
        err.status = 401
        err.message = "Unauthorized"
        return next(err)
      }
      if (req.payload.id !== row.host_id) {
        let err = new Error()
        err.status = 401
        err.message = "Unauthorized"
        return next(err)
      }
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
