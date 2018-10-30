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

const checkUsername = (req, res, next) => {
  let {
    username
  } = req.body
  knex('users')
    .where('username', username)
    .first()
    .then((row) => {
      if (row) {
        let err = new Error()
        err.status = 401
        err.message = "Username already exists"
        next(err)
      } else {
        next()
      }
    })
}

// GET ALL users
router.get('/', (req, res, next) => {
  knex('users')
    .then((rows) => {
      res.json(rows)
    })
    .catch((err) => {
      next(err)
    })
})

//GET ONE user
router.get('/:id', verifyId, (req, res, next) => {
  knex('users')
    .where('id', req.params.id)
    .then((rows) => {
      res.json(rows)
    })
    .catch((err) => {
      next(err)
    })
})

//CREATE users
router.post('/', checkUsername, (req, res, next) => {
  knex('users')
    .insert({
      "username": req.body.username,
      "email": req.body.email,
      "twitchId": req.body.id
    })
    .returning('*')
    .then((data) => {
      res.json(data[0])
    })
    .catch((err) => {
      next(err)
    })
})

// UPDATE ONE record for Users
router.put('/:id', verifyId, (req, res, next) => {
  knex('users')
    .where('id', req.params.id)
    .then((data) => {
      knex('users')
        .where('id', req.params.id)
        .limit(1)
        .update({
          "username": req.body.username,
          "email": req.body.email,
          "firstName": req.body.firstName,
          "lastName": req.body.lastName,
          "address": req.body.address,
          "address": req.body.address,
          "city": req.body.city,
          "zip": req.body.zip,
          "birthday": req.body.birthday,
          "favoritePlatform": req.body.favoritePlatform
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

// DELETE ONE record from Users
router.delete('/:id', verifyId, (req, res, next) => {
  knex('users')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if (!row) return next()
      knex('users')
        .del()
        .where('id', req.params.id)
        .then(() => {
          res.send(`Deleted User ID: ${req.params.id}`)
        })
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router;