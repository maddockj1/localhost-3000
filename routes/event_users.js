var express = require('express');
var router = express.Router();
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

router.get(`/`, (req, res, next) => {
  let err = new Error()
  err.message = `ID is required`
  err.status = 401
  next(err)
})

//GET ALL USERS FOR ONE event
router.get('/:id', verifyId, verifyHost, (req, res, next) => {
  knex('events_users')
    .where('events_id', req.params.id)
    .join('users', 'events_users.users_id', 'users.id')
    .then((rows) => {
      res.json(rows)
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router