import { mark } from "regenerator-runtime";
import { Fraction } from "fractional";
class RecipeView {
  //Private properties
  #parentElement = document.querySelector(".searched-item");
  #data;

  //Methods
  renderSpinner() {
    //Create the spinner markuo
    const spinner = this.spinnerMarkup();
    //Clear everything for the spinner
    this.#parentElement.innerHTML = "";
    //Insert spinner
    this.#parentElement.insertAdjacentHTML("afterbegin", spinner);
  }
  render(data) {
    this.#data = data;
    console.log(this.#data);
    //Create the markup
    const markup = this.#generateMarkup();
    //Hide the message box and spinner
    this.#parentElement.innerHTML = "";
    //Insert the recipie into the parent element
    this.#parentElement.insertAdjacentHTML("beforeend", markup);
  }

  #generateMarkup() {
    return `
      <figure class="figure-section">
                <img
                  src="${this.#data.img}"
                  alt=""
                  class="food-image"
                />
                <h1 class="food-title">
                  <span class="food-title-span">${this.#data.title}</span>
                </h1>
        </figure>
        <div class="cooking-details">
            <div class="cooking-time">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    class="menu-svg">
                    <rect width="256" height="256" fill="none"></rect>
                    <circle
                    cx="128"
                    cy="128"
                    r="96"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="24">
                    </circle>
                    <polyline
                    points="128 72 128 128 184 128"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="24">
                    </polyline>
                </svg>
                <span class="cooking-info-no cooking-time-no data-time">${
                  this.#data.time
                }</span>
                <span class="cooking-info-text cooking-time-text">Minitues</span>
            </div>
            <div class="quantity">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      class="menu-svg">
                      <rect width="256" height="256" fill="none"></rect>
                      <circle
                      cx="88"
                      cy="108"
                      r="52"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24">
                      </circle>
                      <path
                      d="M155.4,57.9A54.5,54.5,0,0,1,169.5,56a52,52,0,0,1,0,104"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24">
                      </path>
                      <path
                      d="M16,197.4a88,88,0,0,1,144,0"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24">
                      </path>
                      <path
                      d="M169.5,160a87.9,87.9,0,0,1,72,37.4"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24">
                      </path>
                   </svg>
                  <span class="cooking-info-no servings-number">${
                    this.#data.servings
                  }</span>
                  <span class="cooking-info-text servings-number-text">Servings</span>
                <div class="quantity-buttons">
                    <button class="quantity-button btn-reduce" data-update-to="3">
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 256 256" class="servings-icon"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></circle><line x1="88" y1="128" x2="168" y2="128" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line></svg>
                    </button>
                    <button class="quantity-button btn-increase"  data-update-to="5" >
                      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 256 256" class="servings-icon"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></circle><line x1="88" y1="128" x2="168" y2="128" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="128" y1="88" x2="128" y2="168" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line></svg>
                    </button>
                </div>
            </div>
            <button class="btn-dish-bookmark">
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 256 256" class="bookmark-dish-icon"><rect width="256" height="256" fill="none"></rect><path d="M192,224l-64-40L64,224V48a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8Z" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path></svg>
            </button>
        </div>
        <div class="dish-ingredients">
            <h2 class="ingredients-header">Receipe Ingredients</h2>
                <ul class="ingredient-list">
                    ${this.#data.ingredients
                      .map((element) => {
                        return `<li class="ingredient">
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 256 256" class="ingredient-icon"><rect width="256" height="256" fill="none"></rect><polyline points="172 104 113.3 160 84 132" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></polyline><circle cx="128" cy="128" r="96" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></circle></svg>
                        <div class="ingredient-amount">${
                          element.quantity === null
                            ? ""
                            : new Fraction(element.quantity).toString()
                        }</div>
                        <div class="receipe-ingredient">
                            <span class="receipe-ingredient-text">${
                              element.description
                            }</span>
                        </div>
                    </li>`;
                      })
                      .join("")}
                
                </ul>
        </div>
      `;
  }

  spinnerMarkup() {
    return `
    <div class="spinner-div">
      <svg xmlns="http://www.w3.org/2000/svg" class="spinner" width="192" height="192"  viewBox="0 0 256 256"><line x1="128" y1="32" x2="128" y2="64" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="224" y1="128" x2="192" y2="128" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="195.9" y1="195.9" x2="173.3" y2="173.3" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="128" y1="224" x2="128" y2="192" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="60.1" y1="195.9" x2="82.7" y2="173.3" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="32" y1="128" x2="64" y2="128" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="60.1" y1="60.1" x2="82.7" y2="82.7" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line></svg>
    </div>
    `;
  }

  //Publisher to load recipies on hashChange and load event
  addHandlerRender(handler) {
    window.addEventListener("hashchange", handler);
    window.addEventListener("load", handler);
  }
}

export default new RecipeView();
