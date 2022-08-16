import View from "./View.js";

class SearchView extends View {
  //Private properties
  _parentElement = document.querySelector(".menu-search-form");
  //Method to get the query value
  getQuery() {
    const query = this._parentElement.querySelector(".input-item").value;
    //Clear the input field
    this._parentElement.querySelector(".input-item").value = "";
    return query;
  }
  //Publisher to load all recipes on a form 'submit'
  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      //Stop page from reloading on a submit
      e.preventDefault();
      //Call the event listner function
      handler();
    });
  }
}
export default new SearchView();
