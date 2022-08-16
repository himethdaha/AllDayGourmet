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
      return "pg 1 and others";
    }
    //On other page
    if (currentPage > 1 && currentPage < noOfPages) {
      return "other";
    }
    //If on last page
    if (currentPage === noOfPages) {
      return "last";
    }
    //If only Pg=1
    if (noOfPages === 1) {
      return "one";
    }
  }
}

export default new PaginationView();
