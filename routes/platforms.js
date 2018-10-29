var express = require('express');
var router = express.Router();
const knex = require('../knex')

// GET ALL platforms
router.get('/', (req, res, next) => {
  knex('platforms')
    .then((rows) => {
      res.json(rows)
    })
    .catch((err) => {
      next(err)
    })
})

//GET ONE platform
router.get('/:id', (req, res, next) => {
  knex('platforms')
    .where('id',req.params.id)
    .then((rows) => {
      res.json(rows)
    })
    .catch((err) => {
      next(err)
    })
})


module.exports = router;
