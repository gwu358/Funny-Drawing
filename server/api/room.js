const router = require('express').Router();

module.exports = router;

// GET api/name
router.get('/', function (req, res) {
  res.send(req.session.roomPath);
});

router.post('/', function (req, res) {
    console.log(req.body)
    req.session.roomPath = req.body.roomPath;
    res.send(req.session.roomPath);
  });