import View from "./View";

class CommentsView extends View {
  _parentElement = document.querySelector(".form-upload");
  _commentBox = document.querySelector(".comment-box");
  _background = document.querySelector(".blured");
  _openForm = document.querySelector(".add-comments");
  _closeForm = document.querySelector(".close-btn");
  _submitBtn = document.querySelector(".comment-btn");

  constructor() {
    super();
    this._addHandlerOpenForm();
    this._addHandlerCloseForm();
    this._addHandlerUploadComments();
  }

  toggle() {
    this._commentBox.classList.toggle("hidden");
    this._background.classList.toggle("hidden");
  }

  _addHandlerOpenForm() {
    this._openForm.addEventListener("click", this.toggle.bind(this));
  }

  _addHandlerCloseForm() {
    this._closeForm.addEventListener("click", this.toggle.bind(this));
  }

  _addHandlerUploadComments() {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();
    });
  }
}

export default new CommentsView();
