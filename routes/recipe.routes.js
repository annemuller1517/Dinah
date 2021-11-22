const router = require('express').Router();
const Recipe = require('../models/Recipe.model');

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

  Recipe.findOne({ id })
    .then((oneRecipe) => {
      res.render('recipes/recipe-details.hbs', { oneRecipe });
    })
    .catch(() => {
      next('Err while getting one recipe');
    });
});

module.exports = router;
