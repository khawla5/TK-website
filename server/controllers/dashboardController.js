const mongoose = require('mongoose');

// get dashboard 
exports.dashboard = async (req, res) => {

    const locals = {
        title: 'Dashboard',
    };

    try {

        res.render('dashboard/index', {
            userName: req.user.displayName, //Get user Name
            layout: '../Views/layouts/dashboard',
        });

    } catch (error) {
        console.log("Error while directing to dashboard "+error);
    }
};