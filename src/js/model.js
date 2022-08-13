//IMPORTS
import { async } from "regenerator-runtime";
import { API_URL } from "./config";
import { getJsonData } from "./helpers";
//State Object
//Which will be rendered in the UI to display all the data regarding a certain food  item
export const state = {
  recipe: {},
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
    console.log(data);
  } catch (error) {
    console.log(`Model Error: ${error}`);
    //Throwing error to be handled by the controller so that the user can see it
    throw err;
  }
};

searchResults("pizza");
