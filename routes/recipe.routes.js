const router = require('express').Router();
const Recipe = require('../models/Recipe.model');
const User = require('../models/User.model');
const Review = require('../models/Review.model');
// const { populate } = require('../models/Recipe.model');

router.get('/'),
  (req, res, next) => {
    res.render('index.hbs');
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

router.get('/cuisine/:cuisine', (req, res, next) => {
  let { cuisine } = req.params;

  Recipe.find({
    // checks for all the elements in the array to match
    cuisines: { $elemMatch: { $regex: cuisine, $options: 'i' } },
  })
    .then((oneCuisine) => {
      res.render('cuisine.hbs', { oneCuisine, cuisine });
    })
    .catch(() => {
      next('Err while getting one cuisine');
    });
});

router.get('/recipe/:id', (req, res, next) => {
  let pic1 = []
  let link = "" 
  let video = ""

  let { id } = req.params;
  Recipe.findById(id)
    .then((oneRecipe) => {
      if (oneRecipe.cuisines.includes("Chinese")) {
        pic1.push("/images/inspiration/chinese.jpg", "/images/inspiration/chinese2.jpg", "/images/inspiration/chinese3.jpg")
        link = "https://open.spotify.com/album/0I13LaEulpdJFna08oU7TX?si=WZ0JiqCOQxy1c7XcLHcXSw"
        video = "https://youtu.be/embed/UTrEBqLZaAo"
      }
      else if (oneRecipe.cuisines.includes("American")) {
        pic1.push("/images/inspiration/american.jpg", "/images/inspiration/american2.jpg", "/images/inspiration/american3.jpg")
        link = "https://open.spotify.com/playlist/58qxjv9hxyi0BUrLj9y9OD?si=e8ed8d3e3b724832"
        video = "https://youtu.be/embed/01jCUM5eYOE"
      }
      else if (oneRecipe.cuisines.includes("Indian")) {
        pic1.push("/images/inspiration/indian.jpg", "/images/inspiration/indian2.jpg", "/images/inspiration/indian3.jpg")
        link = "https://open.spotify.com/album/4G68NOYmVqfFeivPLyIbfJ?si=hWf2MYLARpuw3uvihJ-qgg"
        video = "https://youtu.be/embed/OIvk5Hv0y0Y"
      }
      else if (oneRecipe.cuisines.includes("Italian")) {
        pic1.push("/images/inspiration/italian.jpg", "/images/inspiration/italian2.jpg", "/images/inspiration/italian3.jpg")
        link = "https://open.spotify.com/album/7HsmzCZ0CCYdyUE4r4FgLd?si=1tSnmfIoQtekPsvblA-e9A"
        video = "https://youtu.be/embed/Div_PuxRUL8"
      }
      else if (oneRecipe.cuisines.includes("Japanese")) {
        pic1.push("/images/inspiration/japanese1.jpg", "/images/inspiration/japanese2.jpg", "/images/inspiration/japanese3.jpg")
        link = "https://open.spotify.com/playlist/0xkVkak4rtnux3w0VBhOMp?si=869f757b09b04431"
        video = "https://youtu.be/embed/o6tmxJPcnsg"
      }
      else if (oneRecipe.cuisines.includes("Mediterranean")) {
        pic1.push("/images/inspiration/medi.jpg", "/images/inspiration/medi2.jpg", "/images/inspiration/medi3.jpg")
        link = "https://open.spotify.com/playlist/0erQqpBCFFYj0gDam2pnp1?si=d550199795334cd7"
        video = "https://youtu.be/embed/1mKPz-2nYho"
      }
      else if (oneRecipe.cuisines.includes("Middle Eastern")) {
        pic1.push("/images/inspiration/middle.jpg", "/images/inspiration/middle2.jpg", "/images/inspiration/middle3.jpg")
        link = "https://open.spotify.com/playlist/2JcCrSMfmITGwPlLjNudJ3?si=d91876e60561424c"
        video = "https://youtu.be/embed/kpJIt4_DW6U"
      }
      else if (oneRecipe.cuisines.includes("Mexican")) {
        pic1.push("/images/inspiration/mexican1.jpg", "/images/inspiration/mexican12.jpeg", "/images/inspiration/mexican3.jpeg")
        link = "https://open.spotify.com/playlist/6P6iGiSsbpdgbaIO15tjJ6?si=e75679c8146c4da9"
        video = "https://youtu.be/embed/F6PeH5jaNz4"
      }
      Review.find()
      .populate("userId")
      .populate("recipeId")
      .then((reviews)=> {
        console.log(reviews.userId)
        let filteredReviews = reviews.filter((elem) => {
          return (elem.recipeId._id == id)
          
        })
        res.render('recipes/recipe-details.hbs', { oneRecipe, filteredReviews, pic1, link, video });
      })
      
    })
    .catch(() => {
      next('Err while getting one recipe');
    });
});

router.post('/recipe/:_id', (req, res, next) => {
  if (!req.session.loggedInUser) {
    res.redirect('/signup');
    return;
  }
  const {_id} = req.params
  const {comment} = req.body
  const user = req.session.loggedInUser._id
  Recipe.findById({_id})
    .then(() => {
      Review.create({ comment: comment, userId: user, recipeId: _id })
        .then(() => {
          res.redirect(`/recipe/${_id}`);
        })
        .catch(() => {
          next('Err while getting one recipe');
        });
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/recipe/:_id/favorite', (req, res, next) => {
  if (!req.session.loggedInUser) {
    res.redirect('/signup');
    return;
  }
  
// router.post('/recipe/:_id/update', (req, res, next) => {


// })


  let { _id } = req.params;
  const user = req.session.loggedInUser;
  console.log(user);

  User.updateOne({ _id: user._id }, { $push: { favorites: _id } })
    .then((user) => {
      console.log(user.favorites);
      res.redirect(`/profile`);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
