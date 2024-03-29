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
  bookmarks: [],
  orders: [],
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

    //Everytime a recipe is loaded, check if it's been ordered and if so
    if (state.orders.some((order) => order.id === state.recipe.id)) {
      state.recipe.ordered = true;
    } else {
      state.recipe.ordered = false;
    }

    //Everytime a recipe is loaded, check if the recipe's id is present in the bookmarks array and if so,
    if (state.bookmarks.some((bookmark) => bookmark.id === state.recipe.id)) {
      //Set bookmarked property to true so that the bookmark button in recipieView can identify that and mark the button as bookmarked
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
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
    //Reset page in state to 1 cos, if a user queries another search while in a different page, the results queried will be from that page and not page 1
    state.search.page = 1;
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

//To store bookmarks in local storage
const storeBookmarks = function () {
  localStorage.setItem("bookmark", JSON.stringify(state.bookmarks));
};

//To store orders in local storage
const storeOrders = function () {
  localStorage.setItem("order", JSON.stringify(state.orders));
};

//When an item is bookmarked
export const bookmark = function (recipe) {
  //Push the recipe into the bookmarks array in state
  state.bookmarks.push(recipe);
  //Add a property called 'bookmarked' into the recipe object
  state.recipe.bookmarked = true;

  //Store in local storage
  storeBookmarks();
};

//When an item is marked as orders
export const ordered = function (recipe) {
  //Push order into array
  state.orders.push(recipe);
  //Add property ordered to the recipe
  state.recipe.ordered = true;

  //Store order in local storage
  storeOrders();
};

//When an item is removed from the order state
export const removeOrder = function (id) {
  //Find index first
  const index = state.orders.findIndex((el) => el.id === id);
  state.orders.splice(index, 1);

  //Mark recipe as not ordered
  if (id === state.recipe.id) state.recipe.ordered = false;
  //Remove from local storage
  storeOrders();
};

//To remove a bookmarked item
export const removeBookmark = function (id) {
  //To get the id of the removing item
  const index = state.bookmarks.findIndex((el) => el.id === id);
  //Remove item from array
  state.bookmarks.splice(index, 1);

  //Mark item as not bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  storeBookmarks();
};

//Function to load bookmarks and orders when the page is loaded
const init = function () {
  //Store the bookmarks in a variable
  const storageBookmarks = localStorage.getItem("bookmark");

  //If there are bookmarks then convert the string into an object and store it in state.bookmarks property
  if (storageBookmarks) {
    state.bookmarks = JSON.parse(storageBookmarks);
  }

  //Store orders
  const storeOrders = localStorage.getItem("order");

  //If there are orders then convert the string into an obeject and store in orders array to be read when the page is loaded
  if (storeOrders) {
    state.orders = JSON.parse(storeOrders);
  }
};

init();
