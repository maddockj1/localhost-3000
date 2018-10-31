let express = require('express');
let router = express.Router();
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

//GET all events for one platform
router.get('/:id', verifyId, (req, res, next) => {
  knex('events')
    .where('platform_id', req.params.id)
    .then((rows) => {
      res.json(rows)
    })
    .catch((err) => {
      next(err)
    })
})


module.exports = router;