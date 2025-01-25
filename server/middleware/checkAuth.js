// to prevent non auth user enter dashboard page
exports.isLoggedIn = function(req,res,next){

    if (req.isAuthenticated()) {
        next();
    } else {
       return res.status(402).redirect('/login')
       // and i can render a page rether than a text
    }
}

//to prevent non auth user enter dashboard page
