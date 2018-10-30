const express = require('express')
const router = express.Router()
const knex = require('../knex')


// Middleware Functions
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
router.post('/', (req, res, next) => {
  knex('events')
    .insert({
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
    .catch((err) => {
      next(err)
    })
})

//EDIT event
router.put('/:id', verifyId, (req, res, next) => {
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
router.delete('/:id', verifyId, (req, res, next) => {
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