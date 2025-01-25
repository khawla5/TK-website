const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');





router.post('/auth/login',async (req,res) => {
    const {email, password,rememberMe} =req.body;

    try {
        const user = await User.findOne({email});
        if (!user){ // user not found
            return res.redirect('/login?error=لا يوجد مستخدم بهذا البريد الإلكتروني');
        };

        const matchs = await bcrypt.compare(password,user.password);
        if (!matchs) { // password != user password
             return res.redirect('/login?error=كلمة المرور غير صحيحة');
        };


        return res.redirect('/dashboard')
   
    } catch (error) {
    console.log("error at login" + error);
    return res.status(500);
        
    }


});

router.post('/auth/signup',async (req,res) =>{
    const {email, password,displayName} =req.body;
    try {
        let user = await User.findOne({email});

        if (user) { //found user with same 
            return res.redirect('/signup?error=هذا البريد مأخوذ بالفعل');
        }

        const hashedPassword = await bcrypt.hash(password,5);

        user= await new User({
            email,
            password : hashedPassword,
            displayName
        });
        await user.save();

        req.login(user, (err)=>{
            if (err) {
                console.log("error while userlogin: "+err);
            };
           return res.redirect('/dashboard')
        });

        
    } catch (error) {

        console.log("error while creating User acount"+error)
        
    }

});



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL

},

    async function (accessToken, refreshToken, profile, done) {
        const newUser = {
            googleId: profile.id, 
            email: profile.emails[0].value, 
            displayName: profile.displayName,

        }
        try {
            let user = await User.findOne({ googleId: profile.id });
            if (user) {
                user.login
                done(null, user);
            } else {
                user = await User.create(newUser);//create user
                done(null, user);
            }
        } catch (error) {
            console.log(error)
        }
    }
));


router.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }));

    router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',  //go to home page / or login page 
        successRedirect: '/dashboard', //login succuess => home page 
        
    }),
);


//destroy user session 
router.get('/logout',(req,res)=>{
    req.session.destroy(error =>{
        if (error) {
            console.log(error);
            res.send('Erorr loggin out');
        } else {
            res.redirect('/'); 
        }
    })
});


passport.serializeUser(function (user, done) {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }

});

module.exports = router;