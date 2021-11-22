const router = require('express').Router();
const Recipe = require('../models/Recipe.model');
const User = require('../models/User.model');

router.get('/profile', (req, res, next) => {
    // is user is not loggedin it will redirect to the signup page 
      if(!req.session.loggedInUser){
        res.redirect('/signup'); 
        return;
      }
      // When the login operation completes, user will be assigned to req.session.loggedInUser. This function is primarily used when users sign up, during which req.login() can be invoked to automatically log in the newly registered user.
      req.app.locals.isLoggedIn = true;
      let mainUser = req.session.loggedInUser

      if (mainUser === undefined) {
         mainUser = req.session.loggedInUser
      } 

    User.findOne({_id: mainUser._id})
    .then((user) => {
      res.render('auth/profile.hbs', {username: user.username, email: user.email});
    })
    .catch((err) => {
      next(err)
    })
})









module.exports = router;
