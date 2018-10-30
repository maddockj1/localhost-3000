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

// GET ONE platform
router.get('/:id', verifyId, (req, res, next) => {
  knex('platforms')
    .where('id', req.params.id).first()
    .then((row) => {
      res.json(row)
    })
    .catch((err) => {
      next(err)
    })
})


module.exports = router;