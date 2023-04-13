// select an element by its selector
const $ = (selector) => document.querySelector(selector);
//loads DOM
window.addEventListener("DOMContentLoaded", (event) => {
  const dateDisplay = document.getElementById("date");
// gets current time and date
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
//displays current date and time
  dateDisplay.innerHTML = ` Date: ${year}-${
    month + 1
  }-${day}<br> Time: ${hours}:${minutes}`;

  const form = document.querySelector("form");
  const submitButton2 = document.getElementById("save");
//prevents default when button is clicked and submits first set of options
  submitButton2.addEventListener("click", (event) => {
    event.preventDefault();
    const selectedValue = document.querySelector(
      'input[name="selectOne"]:checked'
    ).value;
    const selectedOption = document.getElementById("selected-option");
    selectedOption.innerHTML = "<strong>" + selectedValue + "</strong>";
    selectedOption.textContent = selectedValue;
  });
  //when button is clicked submits second set of options
  const form2 = document.querySelector(".postTemp");
  const submitButton3 = document.getElementById("submit-3");
  submitButton3.addEventListener("click", (event) => {
    const selectedValue2 = document.querySelector(
      'input[name="oneOption"]:checked'
    ).value;
    const selectedOption2 = document.getElementById("selected-option2");
    selectedOption2.innerHTML = "<strong>" + selectedValue2 + "</strong>";
    selectedOption2.textContent = selectedValue2;
  });
//updates the temperature value from the temp slider
  const slider = document.querySelector("#temp-slider");
  const selectedOption3 = document.querySelector("#selected-option3");

  slider.addEventListener("input", () => {
    selectedOption3.innerHTML = slider.value + "°C";
  });
//defines variables from html id's
  const tempInput = document.getElementById("temp-slider");
  const durationHoursInput = document.getElementById("hours");
  const durationMinutesInput = document.getElementById("minutes");

  //gets values upon submit
  submitButton3.addEventListener("click", function(event) {
    event.preventDefault();
    const tempValue = tempInput.value;
    const durationHoursValue = durationHoursInput.value;
    const durationMinutesValue = durationMinutesInput.value;

  
    // Set the new temperature and display it on the page
    const tempDisplay = document.getElementById("selected-option3");
    tempDisplay.innerHTML = `${tempValue}°C`;
    const initialTemp = tempInput.defaultValue
    
  
    // Start the countdown timer
    const timerDisplay = document.getElementById("selected-option4");
    const timerDuration = durationHoursValue * 3600 + durationMinutesValue * 60; // duration in seconds
    let remainingTime = timerDuration;
  
    const timerInterval = setInterval(() => {
      const hours = Math.floor(remainingTime / 3600);
      const minutes = Math.floor((remainingTime % 3600) / 60);
      const seconds = remainingTime % 60;
  
      timerDisplay.innerHTML = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        // checks if there is time remaining and if not resets to default value
      if (remainingTime === 0) {
        clearInterval(timerInterval);
        timerDisplay.innerHTML = "";
        tempDisplay.innerHTML = `${initialTemp}°C`;
        tempInput.defaultValue
      } else {
        remainingTime--;
      }
    }, 1000);
  });
  
  

const form3 = document.querySelector('form');
const saveButton = document.querySelector('#save');
const submit3Button = document.querySelector('#submit-3');



});
