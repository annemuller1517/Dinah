## Description
<hr>

The app is created for people who want to have a restaurant home experience. 

## API routes (back-end)
<hr>

- GET /
    - renders index.hbs

- GET/auth/signup
    - redirects to "/" if user logged in
    - renders login.hbs

- GET/auth/signin
    - redirects to "/" if user logged in
    - renders login.hbs

- POST /auth/signup
    - redirects to "/" if user logged in
    - body: 
        - username
        - email 
        - password

- POST /auth/signin
    - redirects to "/" if user logged in
    - body
        - email
        - password

- POST /auth/logout
    - body: empty
    - redirect "/"

- GET /profile 
    - render profile.hbs

- POST /profile/delete
    - body: empty

- GET /recipes/:id 
    - render recipes.hbs

- POST /recipes/:id
    - body: 
        - comments

- POST /recipes/:id 
    - redirect "/profile"

- GET /cuisine/:cuisine_id
    - res.render "/cuisine.hbs"




## Models 
<hr>

- User new Schema({
    username: {
        type: String,
        required: true
    }
    email: {
        type: String,
        required: true
    }
    password: {
        type: String,
        required: true
    }
    img: String
    favorites
})

- Comment new Schema ({
    comments: String
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})



- Recipe new Schema ({
    id: Number,
    title: String,
    image: String,
    readyInMinutes: Number,
    vegan: Boolean,
    vegetarian: Boolean,
    glutenFree: Booelean,
    extendedIngredients: [
        original: String,
    ],
    winePairing {
        pairingText: String
    },
    cuisine: String,
    instructions: []
    
})

https://api.spoonacular.com/recipes/324694/analyzedInstructions
- Instructions new Schema {
    steps: [
        {
            step: String
        }
    ],
    mainRecipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
    }
}




seed all the recipes in database, store in in a new model.

## External API
 - https://spoonacular.com/food-api/
    - name 
    - cuisine type
    - ingredients
    - image
    - description 
    - instructions
    - wine pairing
    - time 
    - allergies
