import * as model from "./model.js";
import recipeView from "./views/recipieView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
//API I will be using - https://forkify-api.herokuapp.com/v2
//https://forkify-api.herokuapp.com/api/v2/recipes?(query string)search=pizza

async function food() {
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
    console.log(error);
  }
}

//Event listner to load recipies on hashChange and load event
const persistId = (functionName) => {
  window.addEventListener("hashchange", functionName);
  window.addEventListener("load", functionName);
};

persistId(food);
