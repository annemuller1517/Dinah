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

router.get('/recipes', (req, res, next) => {
  Recipe.find()
    .then((recipes) => {
      res.render('recipes/recipe.hbs', { recipes });
    })
    .catch(() => {
      next('Failed loading title');
    });
});

router.get('/:id/details', (req, res, next) => {
  const { id } = req.params;

  Recipe.findById(id)
    .then((oneRecipe) =>
      res.render('recipes/recipe-details.hbs', { oneRecipe })
    )
    .catch(() => {
      next('Err while getting one recipe');
    });
});

router.get('/:id/details', (req, res, next) => {
  const { id } = req.params;

  Recipe.findById(id)
    .then((oneRecipe) =>
      res.render('recipes/recipe-details.hbs', { oneRecipe })
    )
    .catch(() => {
      next('Err while getting one recipe');
    });
});

router.post('/recipes/:id', (req, res, next) => {
  const { id } = req.params;

  //comments

  // Recipe.findById(id)
  //   .then((oneRecipe) =>
  //     res.render('recipes/recipe-details.hbs', { oneRecipe })
  //   )
  //   .catch(() => {
  //     next('Err while getting one recipe');
  //   });
});

module.exports = router;
