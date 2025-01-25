 const express = require('express');
 const router = express.Router();
 const {isLoggedIn} = require('../middleware/checkAuth');
 const dashboardController = require('../controllers/dashboardController');
 
 router.get('/dashboard',isLoggedIn, dashboardController.dashboard); //to redirect user must be logged in

  module.exports=router; 