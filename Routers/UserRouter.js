const express = require('express');
const router = express.Router();
const auth = require('../controllers/AuthController.js');
router.post('/sign-up', auth.signUp);
router.get('/sign-in', auth.signIn);
module.exports = router;
