const router = require('express').Router();

const { restoreUser, requireAuth } = require("../../utils/auth.js");
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');


router.use(restoreUser);

router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});
// GET /api/restore-user (must be connected before any other middleware or route handlers)
router.get('/restore-user', (req, res) => {
    return res.json(req.user);
  });

router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user });
});


router.get('/require-auth', requireAuth, (req, res) => {
  return res.json(req.user);
});


module.exports = router;
