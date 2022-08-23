import View from "./View";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks-list");

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
}

export default new BookmarksView();
