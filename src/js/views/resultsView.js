import View from "./View.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".result-list");

  _generateMarkup() {
    return `
        ${this._data.map((element) => {
          return `
            <li class="result-preview">
                <a href="#${element.id}" class="result-preview-link">
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
}

export default new ResultsView();
