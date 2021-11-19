const { Schema, model } = require("mongoose");

const recipeSchema = new Schema ({
    id: Number,
    title: String,
    image: String,
    readyInMinutes: Number,
    vegan: Boolean,
    vegetarian: Boolean,
    glutenFree: Boolean,
    extendedIngredients: [{
        original: String,
    }],
    winePairing: {
        pairingText: String,   
    },
    cuisine: String,    
})

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
