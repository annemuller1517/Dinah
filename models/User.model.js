const { Schema, model } = require("mongoose");
require("./Recipe.model")

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    img: String,
    favorites: [{
      type: Schema.Types.ObjectId, 
      ref: "Recipe" 
    }]
})

const User = model("User", userSchema);

module.exports = User;
