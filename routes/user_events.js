var express = require('express');
var router = express.Router();
const knex = require('../knex')

//GET ALL EVENTS FOR ONE user
router.get('/:id', (req, res, next) => {
  knex('events_users')
    .where('users_id', req.params.id)
    .then((rows) => {
      res.json(rows)
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router