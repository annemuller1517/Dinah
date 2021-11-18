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
})

- Comment new Schema ({
    comments: String
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})


