const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
  id: Number,
  title: String,
  image: String,
  readyInMinutes: Number,
  vegan: Boolean,
  vegetarian: Boolean,
  glutenFree: Boolean,
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
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;