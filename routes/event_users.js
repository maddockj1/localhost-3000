var express = require('express');
var router = express.Router();
const knex = require('../knex')

//GET ALL USERS FOR ONE event
router.get('/:id', (req, res, next) => {
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