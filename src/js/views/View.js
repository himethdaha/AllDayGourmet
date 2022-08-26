export default class View {
  //Protected Methods
  _data;

  //Methods

  render(data) {
    this._data = data;
    //Create the markup
    const markup = this._generateMarkup();
    //Hide the message box and spinner
    this._parentElement.innerHTML = "";
    //Insert the recipie into the parent element
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  //Update method to only update the changed elements in the dom
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    //Creating a segment of a document structure comprised of nodes just like the standard document
    const newDom = document.createRange().createContextualFragment(newMarkup);
    //Selecting all the previous elements before the DOM elements were changed
    const prevElements = Array.from(this._parentElement.querySelectorAll("*"));
    //Selecting all the elements in the virtual DOM (newDom)
    const newElements = Array.from(newDom.querySelectorAll("*"));

    //Compare the two arrays to find out which elements have been changed
    newElements.forEach((el, i) => {
      if (prevElements[i].innerHTML !== el.innerHTML) {
        //Change the previous values to the newly set values from the virtual DOM
        prevElements[i].innerHTML = el.innerHTML;
      }
    });
  }

  renderSpinner() {
    //Create the spinner markuo
    const spinner = this.spinnerMarkup();
    //Clear everything for the spinner
    this._parentElement.innerHTML = "";
    //Insert spinner
    this._parentElement.insertAdjacentHTML("afterbegin", spinner);
  }

  spinnerMarkup() {
    return `
    <div class="spinner-div">
      <svg xmlns="http://www.w3.org/2000/svg" class="spinner" width="192" height="192"  viewBox="0 0 256 256"><line x1="128" y1="32" x2="128" y2="64" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="224" y1="128" x2="192" y2="128" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="195.9" y1="195.9" x2="173.3" y2="173.3" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="128" y1="224" x2="128" y2="192" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="60.1" y1="195.9" x2="82.7" y2="173.3" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="32" y1="128" x2="64" y2="128" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="60.1" y1="60.1" x2="82.7" y2="82.7" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line></svg>
    </div>
    `;
  }
}
