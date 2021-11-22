require('../db');

const axios = require('axios');
const mongoose = require('mongoose');
let Recipe = require('../models/Recipe.model');

const download = (id) => {
  axios
    .get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=e5ebb2d50b05472aaf7d9626f7653127`
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
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=95d6b3f742f4410fba6082d3e2db74ca&cuisine=${cuisine}`
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
