let express = require('express');
let router = express.Router();
const knex = require('../knex')

//GET ONE platform
router.get('/:id', (req, res, next) => {
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