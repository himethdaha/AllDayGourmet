//IMPORTS
import { async } from "regenerator-runtime";
import { API_URL, RESULTS_PER_PAGE } from "./config";
import { getJsonData } from "./helpers";
//State Object
//Which will be rendered in the UI to display all the data regarding a certain food  item
export const state = {
  recipe: {},
  search: {
    recipes: [],
    page: 1,
  },
};

export const loadRecipie = async function (id) {
  try {
    //Method from helpers.js
    const data = await getJsonData(`${API_URL}/${id[1]}`);
    const recipe = data.data.recipe;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      img: recipe.image_url,
      publisher: recipe.publisher,
      source: recipe.source_url,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      time: recipe.cooking_time,
    };
  } catch (err) {
    console.log(`Model Error: ${err}`);
    //Throwing error to be handled by the controller so that the user can see it
    throw err;
  }
};

export const searchResults = async function (query) {
  try {
    //Method from helpers.js
    const data = await getJsonData(`${API_URL}?search=${query}`);
    //Push recipes array into the state object
    state.search.recipes = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        img: recipe.image_url,
        publisher: recipe.publisher,
      };
    });
  } catch (error) {
    console.log(`Model Error: ${error}`);
    //Throwing error to be handled by the controller so that the user can see it
    throw err;
  }
};

//For Pagination
//Limiting results per page
export const resultsPerPage = function (page = state.search.page) {
  //Store the page no
  state.search.page = page;
  //Starting item
  const start = (page - 1) * RESULTS_PER_PAGE;
  //Ending item
  const end = page * RESULTS_PER_PAGE;
  return state.search.recipes.slice(start, end);
};

//For increase/decrease in the number of servings
export const changeServings = function (newServings) {
  //Go thorugh the ingredients in the state and change them
  state.recipe.ingredients.forEach((ingr) => {
    if (ingr.quantity === null || ingr.quantity === 0) return;
    //Change the quantity of each ingredient based on the newServings
    ingr.quantity = (ingr.quantity * newServings) / state.recipe.servings;
  });

  //Update the servings in state
  state.recipe.servings = newServings;
};
