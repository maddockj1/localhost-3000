var express = require('express');
var router = express.Router();
const knex = require('../knex')

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
router.get('/:id', (req, res, next) => {
  knex('users')
    .where('id',req.params.id)
    .then((rows) => {
      res.json(rows)
    })
    .catch((err) => {
      next(err)
    })
})

//CREATE users
router.post('/', (req, res, next) => {
  knex('users')
    .insert({
      "username": req.body.username,
      "email": req.body.email,
      "firstName": req.body.firstName,
      "lastName": req.body.lastName,
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
    .catch((err) => {
      next(err)
    })
})

// UPDATE ONE record for Users
router.put('/:id', (req, res, next) => {
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
router.delete('/:id', function(req, res, next) {
  knex('users')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if(!row) return next()
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
