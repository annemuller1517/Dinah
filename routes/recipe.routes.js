const router = require('express').Router();
const Recipe = require('../models/Recipe.model');
const User = require('../models/User.model');
const Review = require('../models/Review.model');
const { populate } = require('../models/Recipe.model');

router.get('/'),
  (req, res, next) => {
    res.render('/index.hbs');
  };

router.get('/recipes', (req, res, next) => {
  Recipe.find()
    .then((recipes) => {
      res.render('recipes/recipe.hbs', { recipes });
    })
    .catch(() => {
      next('Failed loading title');
    });
});

router.get('/cuisine/:cuisine', (req, res, next) => {
  let { cuisine } = req.params;

  Recipe.find({
    // checks for all the elements in the array to match
    cuisines: { $elemMatch: { $regex: cuisine, $options: 'i' } },
  })
    .then((oneCuisine) => {
      res.render('cuisine.hbs', { oneCuisine, cuisine });
    })
    .catch(() => {
      next('Err while getting one cuisine');
    });
});

router.get('/recipe/:id', (req, res, next) => {
  // const button = document.getElementsByClassName("addToFav")
  // button.addEventListener('click', event => {
  //   res.redirect("/profile")
  // });

  let { id } = req.params;
  Recipe.findById(id)
    .then((oneRecipe) => {
      Review.find()
        .populate('userId')
        .populate('recipeId')
        .then((reviews) => {
          console.log(reviews.userId);
          let filteredReviews = reviews.filter((elem) => {
            return elem.recipeId._id == id;
          });
          res.render('recipes/recipe-details.hbs', {
            oneRecipe,
            filteredReviews,
          });
        });
    })
    .catch(() => {
      next('Err while getting one recipe');
    });
});

router.post('/recipe/:_id', (req, res, next) => {
  if (!req.session.loggedInUser) {
    res.redirect('/signup');
    return;
  }
  const { _id } = req.params;
  const { name, comment } = req.body;
  const user = req.session.loggedInUser._id;
  Recipe.findById({ _id })
    .then(() => {
      Review.create({ comment: comment, userId: user, recipeId: _id })
        .then(() => {
          res.redirect(`/recipe/${_id}`);
        })
        .catch(() => {
          next('Err while getting one recipe');
        });
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/recipe/:_id/favorite', (req, res, next) => {
  if (!req.session.loggedInUser) {
    res.redirect('/signup');
    return;
  }

  let { _id } = req.params;
  const user = req.session.loggedInUser;
  console.log(user);

  User.updateOne({ _id: user._id }, { $push: { favorites: _id } })
    .then((user) => {
      console.log(user.favorites);
      res.redirect(`/profile`);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
