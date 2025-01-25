const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController.js');


router.get('/', mainController.homepage);
router.get('/login', mainController.login);
router.get('/signup', mainController.signup);

module.exports = router;