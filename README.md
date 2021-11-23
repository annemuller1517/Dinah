## Description

<hr>

The app is created for people who want to have a restaurant home experience.

## API routes (back-end)

<hr>

- GET /

  - renders index.hbs

- GET/auth/signup

  - redirects to "/profile" if user logged in
  - renders signup.hbs

- GET/auth/signin
  - renders signup.hbs

- POST /auth/signup

  - redirects to "/profile" if user logged in
  - body:
    - username
    - password
    - email

- POST /auth/signin

  - redirects to "/profile" if user logged in
  - body
    - email
    - password

- POST /auth/signout

  - body: empty
  - redirect "/signup"

- GET /profile

  - render profile.hbs

- POST /profile/delete

  - favorites: delete
  - redirects "/profile"

- POST /upload 
  - img: req.file.path
  - redirects "/profile"

- GET /recipes/:id

  - render recipe-details.hbs

- POST /recipes/:_id

  - body:
    - comments
    - userId
    - recipeId

- POST /recipes/:_id

  - redirect "/profile"

- POST /recipe/:_id/favorite
  - favorites: update
  - redirect "/profile"

- GET /cuisine/:cuisine
  - res.render "/cuisine.hbs"

## Models

<hr>

- User new Schema ({
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
    img: {
        type: String,
        default: "profile.png"
    },
    favorites: [{
      type: Schema.Types.ObjectId, 
      ref: "Recipe" 
    }]
})

- Review new Schema ({
    comment: {
        type: String,
        required: true,
  },
    userId: {
        ref: "User",
        type: Schema.Types.ObjectId
    }, 
    recipeId: {
        ref: "Recipe",
        type: Schema.Types.ObjectId
    }, 
  });

- Recipe new Schema ({
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

https://api.spoonacular.com/recipes/324694/analyzedInstructions

## External API

- https://spoonacular.com/food-api/
 
