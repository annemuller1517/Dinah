require('../db');

const axios = require('axios');
const mongoose = require('mongoose');
let Recipe = require('../models/Recipe.model');

const download = (id) => {
  axios
    .get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=5d685f063a694f9abaf8b6a866f4246b`
    )
    .then((infoResult) => {
      Recipe.insertMany([infoResult.data]);
      console.log('Data inserted');
    })
    .catch((err) => {
      console.log(err);
    });
};

const search = (cuisine) => {
  axios
    .get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=5d685f063a694f9abaf8b6a866f4246b&cuisine=${cuisine}`
    )
    .then((searchResult) => {
      searchResult.data.results.forEach((e) => {
        download(e.id);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

search('italian');
search('indian');
search('mexican');
search('american');
search('chinese');
search('japanese');
search('mediterranean');
search('middle eastern');
