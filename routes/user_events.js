var express = require('express');
var router = express.Router();
const knex = require('../knex')
const jwt = require('jsonwebtoken')

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

const verifyPost = (req, res, next) => {
  let {
    user_id,
    event_id
  } = req.params
  if (isNaN(user_id)) {
    let err = new Error()
    err.status = 401
    err.message = `Not a valid User ID`
    next(err)
  } else if (isNaN(event_id)) {
    let err = new Error()
    err.status = 401
    err.message = `Not a valid Event ID`
    next(err)
  } else {
    next()
  }
}

const jwtVerify = (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, _payload) => {
    if (err) {
      return next(err);
    } else {
      req.payload = _payload
      next()
    }
  })
}

router.post('/:event_id/:user_id', verifyPost, jwtVerify, (req, res, next) => {
  if (req.payload.id !== req.params.id) {
    let err = new Error()
    err.status = 401
    err.message = "Unauthorized"
    next(err)
  }
  knex(`events_users`)
    .where({
      events_id: parseInt(req.params.event_id),
      users_id: parseInt(req.params.user_id)
    })
    .first()
    .then((row) => {
      console.log(`row: `, row);
      if (row) {
        let err = new Error()
        err.status = 401
        err.message = `Already signed up`
        return next(err)
      } else {
        knex('events_users')
          .insert({
            events_id: parseInt(req.params.event_id),
            users_id: parseInt(req.params.user_id)
          })
          .returning('*')
          .then((data) => {
            res.json(data[0])
          })
          .catch((err) => {
            next(err)
          })
      }
    })
    .catch((err) => {
      next(err)
    })
})

// GET ALL EVENTS FOR ONE user
router.get('/:id', verifyId, jwtVerify, (req, res, next) => {
  knex('users')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if (req.payload.id !== row.id) {
        let err = new Error()
        err.status = 401
        err.message = "Unauthorized"
        next(err)
      } else {
        knex('events_users')
          .where('users_id', row.id)
          .then((rows) => {
            res.json(rows)
          })
          .catch((err) => {
            next(err)
          })
      }
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router