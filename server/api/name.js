const router = require('express').Router();

module.exports = router;

// GET api/name
router.get('/', function (req, res, next) {
  res.send(req.session.name);
});

router.post('/', function (req, res, next) {
    req.session.name = req.body.name;
    res.send(req.session.name);
  });