const router = require('express').Router();
const { restoreUser, requireAuth } = require("../../utils/auth.js");

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

module.exports = router;
