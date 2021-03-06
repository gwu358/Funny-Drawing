const router = require('express').Router();

module.exports = router;

// GET api/name
router.get('/', function (req, res) {
  res.send(req.session.name);
});

router.post('/', function (req, res) {
    req.session.name = req.body.name;
    res.send(req.session.name);
  });