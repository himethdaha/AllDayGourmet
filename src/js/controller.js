import * as model from "./model.js";
import recipeView from "./views/recipieView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";
//API I will be using - https://forkify-api.herokuapp.com/v2
//https://forkify-api.herokuapp.com/api/v2/recipes?(query string)search=pizza

//Function to GET a recipie based on an id
async function controlRecipes() {
  //Getting the recipie
  try {
    //Get the id from the url
    const id = window.location.hash.split("#");

    //If there is no id in the url just return
    if (id.length === 1) {
      return;
    }

    //While await, call renderSpinner
    recipeView.renderSpinner();

    //1) Loading the recipie
    //Not saving anything here cos we don't return anything in this promise
    await model.loadRecipie(id);
    //2) Rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    //Passing in the error from 'helpers.js' which was caught and re thrown by 'model.js' to be seen by the user
    recipeView.errorMessage(error);
  }
}

//Function to GET all recipes based on a query string
async function searchRecipes() {
  try {
    //1)Query coming in from the searchView
    const query = searchView.getQuery();
    console.log(query);
    //If no query present
    if (!query) return;

    //While await, call renderSpinner
    resultsView.renderSpinner();

    //2) Loading all the recipes
    await model.searchResults(query);
    console.log(model.state.search.recipes);

    //3)Rendering the recipes
    resultsView.render(model.state.search.recipes);

    //If there are no searched results
    if (model.state.search.recipes.length === 0) {
      resultsView.errorMessage(
        `No Items found. Please check your spellings and try again! 🙂`
      );
    }
  } catch (error) {
    console.log(error);
  }
}
//Initialization Method
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(searchRecipes);
};

init();
