class SearchView {
  //Private properties
  #parentEl = document.querySelector(".menu-search-form");
  //Method to get the query value
  getQuery() {
    const query = this.#parentEl.querySelector(".input-item").value;
    //Clear the input field
    this.#parentEl.querySelector(".input-item").value = "";
    return query;
  }
  //Publisher to load all recipes on a form 'submit'
  addHandlerSearch(handler) {
    this.#parentEl.addEventListener("submit", function (e) {
      //Stop page from reloading on a submit
      e.preventDefault();
      //Call the event listner function
      handler();
    });
  }
}
export default new SearchView();
