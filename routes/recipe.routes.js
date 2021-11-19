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

router.get('/recipes/:id', (req, res, next) => {
  let { id } = req.params;

  Recipe.findOne({ id })
    .then((oneRecipe) => {
      res.render('recipes/recipe-details.hbs', { oneRecipe });
    })
    .catch(() => {
      next('Err while getting one recipe');
    });
});

router.get('/cuisine/:cuisine', (req, res, next) => {
  let { cuisine } = req.params;

  Recipe.findOne(cuisine)
    .then((oneRecipe) => {
      res.render('recipes/cuisine.hbs', { oneRecipe });
    })
    .catch(() => {
      next('Err while getting one recipe');
    });
});

module.exports = router;
