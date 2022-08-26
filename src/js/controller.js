import * as model from "./model.js";
import recipeView from "./views/recipieView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import ordersView from "./views/ordersView.js";
import commentsView from "./views/commentsView.js";

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

    //1)Update the search results and highlight the clicked item in the aside preview list
    resultsView.update(model.resultsPerPage());

    //2) Loading the recipie
    //Not saving anything here cos we don't return anything in this promise
    await model.loadRecipie(id);
    //3) Rendering the recipe
    recipeView.render(model.state.recipe);
    //4)Update the bookmarks list to be highlighted when on item
    bookmarksView.update(model.state.bookmarks);
    //5)Update the orders view to be highlighted when on item
    ordersView.update(model.state.orders);
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
    //If no query present
    if (!query) return;

    //While await, call renderSpinner
    resultsView.renderSpinner();

    //2) Loading all the recipes
    await model.searchResults(query);

    //3)Rendering the recipes for the first set of results
    // resultsView.render(model.state.search.recipes);
    resultsView.render(model.resultsPerPage());

    //4)Rendering pagination for page 2
    paginationView.render(model.state.search);

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

//Function for pagination with new results and pagination buttons
function paginateRecipes(page) {
  //Rendering new results
  resultsView.render(model.resultsPerPage(page));
  //Rendering new pagination buttons
  paginationView.render(model.state.search);
}

//Function to increase/decrease ingredient quantities based on the number of servings
function changeRecipeInredientQuantity(servings) {
  //Set the new servings in the model
  model.changeServings(servings);
  //Render the page again
  recipeView.update(model.state.recipe);
}

//Function for recipe bookmarks
function recipeBookmarked() {
  //1)If recipe ISN'T bookmarked and the button is clicked
  if (!model.state.recipe.bookmarked) {
    model.bookmark(model.state.recipe);
  }
  //2)If recipe IS bookmarked and the button is clicked
  else {
    model.removeBookmark(model.state.recipe.id);
  }

  //3)update the recipieView with the bookmark button colored
  recipeView.update(model.state.recipe);

  //4)Render the bookmarks-list with all the bookmarked recipes
  bookmarksView.render(model.state.bookmarks);
}

//Function for ordered items
function orderedItems() {
  //If the order button ISN'T clicked, push the new item into the orders array
  if (!model.state.recipe.ordered) {
    model.ordered(model.state.recipe);
  }
  //If the order button IS clicked, remove the item from the orders array
  else {
    model.removeOrder(model.state.recipe.id);
  }
  //Update the recipe view with the order button text changed
  recipeView.update(model.state.recipe);
  //Render the orders view
  ordersView.render(model.state.orders);
}

//Function to load all bookmarked items on window load
const loadAllBookmarks = function () {
  //Render the bookmarks
  if (model.state.bookmarks.length > 0) {
    bookmarksView.render(model.state.bookmarks);
  }
};

//Function to load all orders on page load
const loadAllOrders = function () {
  if (model.state.orders.length > 0) {
    ordersView.render(model.state.orders);
  }
};

const uploadComments = function (recipe) {
  console.log(recipe);
};
//Initialization Method
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerChangeServings(changeRecipeInredientQuantity);
  recipeView.addHandlerBookmarks(recipeBookmarked);
  recipeView.addHandlerOrders(orderedItems);
  searchView.addHandlerSearch(searchRecipes);
  paginationView.addHandlerChangeResults(paginateRecipes);
  bookmarksView.addHandlerRenderBookmark(loadAllBookmarks);
  ordersView.addHandlerLoadOrders(loadAllOrders);
};

init();
