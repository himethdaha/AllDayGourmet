import { RESULTS_PER_PAGE } from "../config";
import View from "./View";

class PaginationView extends View {
  //Properties
  _parentElement = document.querySelector(".pagination-btn-section");

  _generateMarkup() {
    const noOfPages = Math.ceil(this._data.recipes.length / RESULTS_PER_PAGE);
    const currentPage = this._data.page;

    //If Pg=1 and there are other pages
    if (currentPage === 1 && noOfPages > 1) {
      return `
        <button class="btn-pagination pagination-after"> 
            <span class="btn-pagination-text">Page ${currentPage + 1}</span>
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 256 256" class="pagination-icon"><rect width="256" height="256" fill="none"></rect><line x1="40" y1="128" x2="216" y2="128" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><polyline points="144 56 216 128 144 200" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></polyline></svg>
        </button>
      `;
    }
    //On other page
    if (currentPage > 1 && currentPage < noOfPages) {
      return `
        <button class="btn-pagination pagination-after"> 
            <span class="btn-pagination-text">Page ${currentPage + 1}</span>
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 256 256" class="pagination-icon"><rect width="256" height="256" fill="none"></rect><line x1="40" y1="128" x2="216" y2="128" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><polyline points="144 56 216 128 144 200" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></polyline></svg>
        </button>

        <button class="btn-pagination pagination-before">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="pagination-icon"><rect width="256" height="256" fill="none"></rect><line x1="216" y1="128" x2="40" y2="128" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><polyline points="112 56 40 128 112 200" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></polyline></svg>               
            <span class="btn-pagination-text">Page ${currentPage - 1}</span>
        </button>
      `;
    }
    //If on last page
    if (currentPage === noOfPages) {
      return `
        <button class="btn-pagination pagination-before">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="pagination-icon"><rect width="256" height="256" fill="none"></rect><line x1="216" y1="128" x2="40" y2="128" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><polyline points="112 56 40 128 112 200" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></polyline></svg>               
            <span class="btn-pagination-text">Page ${currentPage - 1}</span>
        </button>
      `;
    }
    //If only Pg=1
    if (noOfPages === 1) {
      return ``;
    }
  }
}

export default new PaginationView();
