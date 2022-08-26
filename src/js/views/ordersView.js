import View from "./View";

class OrdersView extends View {
  _parentElement = document.querySelector(".orders-list");
  _ordersBox = document.querySelector(".orders-box");
  _openOrders = document.querySelector(".view-orders");
  _closeOrders = document.querySelector(".close-order");

  constructor() {
    super();
    this._addHandlerOpenOrders();
    this._addHandlerCloseOrders();
  }

  _generateMarkup() {
    const urlId = window.location.hash.split("#")[1];
    return `
        ${this._data.map((element) => {
          return `
            <li class="result-preview">
                <a href="#${element.id}" class="result-preview-link ${
            element.id === urlId ? "active-preview" : ""
          }">
            <figure class="result-preview-figure">
                <img src="${element.img}" alt="" class="result-preview-img">
              </figure>
            <div class="result-preview-description">
                <h4 class="result-preview-title">${element.title}</h4>
              </div>
            </a>
          </li> 
            `;
        })}
    `;
  }

  addHandlerLoadOrders(handler) {
    window.addEventListener("load", handler);
  }

  toggle() {
    this._ordersBox.classList.toggle("hidden");
  }

  _addHandlerOpenOrders() {
    this._openOrders.addEventListener("click", this.toggle.bind(this));
  }
  _addHandlerCloseOrders() {
    this._closeOrders.addEventListener("click", this.toggle.bind(this));
  }
}

export default new OrdersView();
