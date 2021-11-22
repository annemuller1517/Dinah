const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
  id: Number,
  title: String,
  image: String,
  readyInMinutes: Number,
  vegan: Boolean,
  vegetarian: Boolean,
  glutenFree: Boolean,
  dairyFree: Boolean,
  dishTypes: [],
  servings: Number,
  instructions: String,
  extendedIngredients: [
    {
      original: String,
    },
  ],
  winePairing: {
    pairingText: String,
  },
  cuisines: [],
  healthScore: Number,

});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;
