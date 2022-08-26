import View from "./View";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks-list");
  _bookmarksBox = document.querySelector(".bookmarks-box");
  _openBookmarks = document.querySelector(".bookmark-item");
  _closeBookmarks = document.querySelector(".close-bookmark");

  constructor() {
    super();
    this._addHandlerOpenBookmarks();
    this._addHandlerCloseBookmarks();
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

  addHandlerRenderBookmark(handler) {
    window.addEventListener("load", handler);
  }

  //Method to bind this with the instance of the class
  toggle() {
    this._bookmarksBox.classList.toggle("hidden");
  }
  //Method to show bookmarks
  _addHandlerOpenBookmarks() {
    this._openBookmarks.addEventListener("click", this.toggle.bind(this));
  }

  //Method to close bookmarks
  _addHandlerCloseBookmarks() {
    this._closeBookmarks.addEventListener("click", this.toggle.bind(this));
  }
}

export default new BookmarksView();
