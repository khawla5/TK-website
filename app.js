require('dotenv').config();

const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override')
const connectDB = require('./server/config/db');
const session = require("express-session");
const passport = require('passport');
const MongoStore = require('connect-mongo');





const app = express();
const port = process.env.PORT || 3000 ;

// database
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
   // cookie: {maxAge: new Date( Date.now() + (3600000) ) } // expire date for session
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"))

//connect to database
connectDB();


//Static Files
app.use(express.static('public'));

//Templating engien
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine','ejs');

//routes
app.use('/', require("./server/routes/auth")); //database route
app.use('/', require("./server/routes/index"));
app.use('/', require("./server/routes/dashboard"));
// Route for handling 404 must be last route
app.get('*', function(req,res){
    //res.status(404).send('404 Page not Found.')
    //or custom page
    res.status(404).render('404');
})

app.listen(port,()=> {
    console.log(`App listening on port ${port}`);
});