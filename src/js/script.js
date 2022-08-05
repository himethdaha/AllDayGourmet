("use strict");

//Get all the individual testimonials
const testimonials = document.querySelectorAll(".test");
const btnRight = document.querySelector(".btn--right");
const btnLeft = document.querySelector(".btn--left");
let currentSlide = 0;
const maxSlides = testimonials.length;
const buttonContainer = document.querySelector(".buttons");
const circleButtons = document.querySelectorAll(".circle-btn");
const year = document.querySelector(".year");

testimonials.forEach((element, index) => {
  //Move them off the screen
  element.style.transform = `translateX(${170 * index}%)`;
});

//Button right functionality

btnRight.addEventListener("click", function () {
  //Check if the currentSlide is at the last slide
  //maxSlides.length = 3, currSlide is '0' based. That's why i gotta subtract 1
  if (currentSlide === maxSlides - 1) {
    //If at the last slide, when the click event happens change the currentSlide to 0
    currentSlide = 0;
  } else {
    //When clicking the button add one to the currentSlide variable
    currentSlide++;
  }
  testimonials.forEach((element, index) => {
    //Move them off the screen
    //Subtract the currentSlide from the index to move the slide at '0' to '-1' and slide at '1' to '0'
    //This way we can get the next slide as the current and the current slide as the previous
    element.style.transform = `translateX(${170 * (index - currentSlide)}%)`;
    activateButton(currentSlide);
  });
});

//Button left functionality
btnLeft.addEventListener("click", function () {
  //Check if the currentSlide is at '0'
  if (currentSlide === 0) {
    //If at '0' assign currentSlide to the last slide
    currentSlide = maxSlides - 1;
  } else {
    //When clicking the button subtract one to the currentSlide variable
    currentSlide--;
  }

  testimonials.forEach((element, index) => {
    //Move them off the screen
    //Subtract the currentSlide from the index to move the slide at '0' to '-1' and slide at '1' to '0'
    //This way we can get the next slide as the current and the current slide as the previous
    element.style.transform = `translateX(${170 * (index - currentSlide)}%)`;
    activateButton(currentSlide);
  });
});

//Event listener for the circular buttons
//Add the listner to the parent element
buttonContainer.addEventListener("click", function (e) {
  //Check if the event target contains the class for the cirlce buttons
  if (e.target.classList.contains("circle-btn")) {
    const slide = e.target.dataset.slide;
    testimonials.forEach((element, index) => {
      //Move them off the screen
      //Subtract the currentSlide from the index to move the slide at '0' to '-1' and slide at '1' to '0'
      //This way we can get the next slide as the current and the current slide as the previous
      element.style.transform = `translateX(${170 * (index - slide)}%)`;
      activateButton(currentSlide);
    });
  }
});

//Show the active slide in the cirlce dots
const activateButton = function (slide) {
  //Loop through all the circle buttons
  circleButtons.forEach((circle) => circle.classList.remove("active"));
  //Select the button based on the dataselector
  document
    .querySelector(`.circle-btn[data-slide="${slide}"]`)
    .classList.add("active");
};

//Getting the current year for the copyright text
const currDate = new Date();
const currYear = currDate.getFullYear();
year.textContent = currYear;
