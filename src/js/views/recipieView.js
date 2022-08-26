import View from "./View.js";
import { mark } from "regenerator-runtime";
import { Fraction } from "fractional";

class RecipeView extends View {
  //Protected properties
  _parentElement = document.querySelector(".searched-item");

  _generateMarkup() {
    return `
      <figure class="figure-section">
                <img
                  src="${this._data.img}"
                  alt=""
                  class="food-image"
                />
                <h1 class="food-title">
                  <span class="food-title-span">${this._data.title}</span>
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
                  this._data.time
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
                    this._data.servings
                  }</span>
                  <span class="cooking-info-text servings-number-text">Servings</span>
                <div class="quantity-buttons">
                    <button class="quantity-button btn-reduce" data-updateto="${
                      this._data.servings - 1
                    }">
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 256 256" class="servings-icon"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></circle><line x1="88" y1="128" x2="168" y2="128" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line></svg>
                    </button>
                    <button class="quantity-button btn-increase"  data-updateto="${
                      this._data.servings + 1
                    }" >
                      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 256 256" class="servings-icon"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></circle><line x1="88" y1="128" x2="168" y2="128" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="128" y1="88" x2="128" y2="168" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line></svg>
                    </button>
                </div>
            </div>
            <button class="btn-dish-bookmark">
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 256 256" class="bookmark-dish-icon ${
                      this._data.bookmarked ? "bookedmark-icon" : ""
                    }"><rect width="256" height="256" fill="none"></rect><path d="M192,224l-64-40L64,224V48a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8Z" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path></svg>
            </button>
        </div>
        <div class="dish-ingredients">
            <h2 class="ingredients-header">Receipe Ingredients</h2>
                <ul class="ingredient-list">
                    ${this._data.ingredients
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
                <div class="order-btn-flex">
                  <button class="btn-order">
                      ${
                        this._data.ordered
                          ? '<span class="order-text">Remove Order</span>'
                          : '<span class="order-text">Order</span>'
                      }
                  </button>
        <     /div>
        </div>
        
      `;
  }

  errorMessage(message) {
    const markup = `
    <div class="error-message">
        <div class="error-icon">
        <svg xmlns="http://www.w3.org/2000/svg" classs="error-icon" fill="#f03e3e" viewBox="0 0 256 256"><line x1="128" y1="80" x2="128" y2="132" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><path d="M164.5,32h-73a7.9,7.9,0,0,0-5.6,2.3L34.3,85.9A7.9,7.9,0,0,0,32,91.5v73a7.9,7.9,0,0,0,2.3,5.6l51.6,51.6a7.9,7.9,0,0,0,5.6,2.3h73a7.9,7.9,0,0,0,5.6-2.3l51.6-51.6a7.9,7.9,0,0,0,2.3-5.6v-73a7.9,7.9,0,0,0-2.3-5.6L170.1,34.3A7.9,7.9,0,0,0,164.5,32Z" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path><circle cx="128" cy="172" r="16"></circle></svg>
        </div>
        <span class="error-message-text">${message}</span>
    </div>
    `;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //Publisher to load recipies on hashChange and load event
  addHandlerRender(handler) {
    window.addEventListener("hashchange", handler);
    window.addEventListener("load", handler);
  }

  //Handler to update ingredient quantites based on servings amount
  addHandlerChangeServings(handler) {
    //event delegation
    this._parentElement.addEventListener("click", function (e) {
      //Select the increase/decrease buttons
      const btn = e.target.closest(".quantity-button");
      if (!btn) return;

      //Save the increment/decrement value
      const changeTo = Number(btn.dataset.updateto);
      if (changeTo > 0) handler(changeTo);
    });
  }

  //Handler for bookmarks
  addHandlerBookmarks(handler) {
    this._parentElement.addEventListener("click", function (e) {
      //Get the bookmark button
      const btn = e.target.closest(".btn-dish-bookmark");

      if (!btn) return;
      handler();
    });
  }

  //Handler for orders to be loaded
  addHandlerOrders(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-order");

      if (!btn) return;
      handler();
    });
  }
}

export default new RecipeView();
