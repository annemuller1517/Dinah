const router = require('express').Router();
const Recipe = require('../models/Recipe.model');
const User = require('../models/User.model');
const Review = require("../models/Review.model");

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
  let { id } = req.params;
  //console.log(_id)
  Recipe.findById(id)
    .then((oneRecipe) => {
      Review.find()
      .populate("recipeId")
      .then((reviews)=> {
        let filteredReviews = reviews.filter((elem) => {
          return (elem.recipeId._id == id)
          
        })
        console.log(filteredReviews)
        res.render('recipes/recipe-details.hbs', { oneRecipe, filteredReviews });
      })
      
    })
    .catch(() => {
      next('Err while getting one recipe');
    });
});

router.post('/recipe/:_id', (req, res, next) => {
  const {_id} = req.params
  const {comment} = req.body
  const user = req.session.loggedInUser._id

  Recipe.findById({_id})
    .then(() => {
      Review.create({comment: comment, userId:user, recipeId: _id})
      .then(()=> {
        res.redirect(`/recipe/${_id}`);
      })
      .catch(() => {
        next('Err while getting one recipe');
      });
      })
  .catch((err) => {
        next(err)
  })
    })

module.exports = router;
