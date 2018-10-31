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

//GET ALL EVENTS FOR ONE user
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
          .where('users_id', req.params.id)
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