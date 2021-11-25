const { Schema, model } = require('mongoose');

require('./User.model');
require('./Recipe.model');

const reviewSchema = new Schema({
  rate: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  userId: {
    ref: 'User',
    type: Schema.Types.ObjectId,
  },
  recipeId: {
    ref: 'Recipe',
    type: Schema.Types.ObjectId,
  },
});

const Review = model('review', reviewSchema);

module.exports = Review;
