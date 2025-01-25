const mongoose = require('mongoose');

const Schema =mongoose.Schema;

const UserSchema = new Schema({
    googleId: {
        type: String,
        default: null 
    },
    email: {
        type: String,
        required: function() {
            return !this.googleId; 
        }
    },
    password: {
        type: String,
        required: function() {
            return !this.googleId; 
        }
    },
    displayName: {
        type: String,
        // required: true
    },

    // profileImage: {
    //     type: String,
    //     required: false // اختياري في حال تسجيل بالبريد
    // },
  
});


module.exports =mongoose.model('User',UserSchema); 

