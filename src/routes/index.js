const express = require('express');
const googleLogin = require('./google.route')

const router = express.Router();

// router.use()
router.use('/login/google', googleLogin);

module.exports = router;
