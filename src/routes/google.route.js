const express=require('express');
const router = express.Router();
const {googleLogin} = require('../controllers/googleCallback.controller');

router.post('/callback', googleLogin);

module.exports = router;