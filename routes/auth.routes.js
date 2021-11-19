const router = require("express").Router();
const UserModel = require('../models/User.model')
const bcrypt = require("bcryptjs")

router.get("/signup", (req, res, next) => {
    res.render('auth/signup.hbs')
})

router.post("/signup", (req, res, next) => {
    // get info from the form 
    let {username, email, password} = req.body

    //encrypt the password 
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    
    // check required fields 
    if (username == "") {
        res.render("auth/signup", {error:"Please enter a username"})
        return;
    }

    let emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!emailRegEx.test(email)) {
        res.render("auth/signup", {error:"Please Enter Valid Email"})
        return;
    }


    let passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    if (!passwordRegEx.test(password)) {
        res.render("auth/signup", {error:"Please enter a valid password: Minimum eight characters, at least one lower case, one upper case one number"})
        return;
    }


    UserModel.create({username, email, password: hash})
        .then(()=> {
            res.redirect('/');
        })
        .catch((err)=> {
            next(err)
        })
})


router.get("/signin", (req, res, next) => {
    res.render('auth/signup.hbs')
})


router.post("/signin", (req, res, next) => {
    let {username, password} = req.body
    UserModel.find({username})
    .then((usernameResponse) => {
        if(usernameResponse.length) {        
            
            let userObj = usernameResponse[0]
            let isMatching = bcrypt.compareSync(password, userObj.password);
       
            if (isMatching){
                req.session.myProperty = userObj;
                res.redirect("/")
            }
            else {
                res.render("auth/signup.hbs", {error:"Failed To Sign In"})
                return
            }
        }
        else {
            res.render("auth/signup.hbs", {error:"Please Enter Username"})
            return
        }

        //console.log(usernameResponse)
    })
    .catch((err)=> {
        next(err)
    })
})

const checkLogIn = (req, res, next) => {
    if (req.session.myProperty ) {
      //invokes the next available function
      next()
    }
    else {
      res.redirect('/signin')
    }
}


router.get("/profile", checkLogIn, (req, res, next) => {
    res.render("auth/profile.hbs")
})

module.exports = router