// get homepage
exports.homepage = async (req,res)=> {
    const locals = {
        title: 'تخمينة',
        description: 'خمن الكلمات الصحيحة'
    }
    res.render('index',{
        locals,
        layout:'../Views/layouts/front-page'
    });
}

// get about

exports.login = async (req,res)=> {
    const locals = {
        title: 'Login Page',
    }
    res.render('login',locals);
   
}

exports.signup = async (req,res)=> {
    const locals = {
        title: 'SignUp Page',
    }
    res.render('signup',{locals,
    layout:'../Views/layouts/main'
    });
   
}