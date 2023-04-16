const $ = (selector) => document.querySelector(selector);
let countdownTimer;

function saveUserData(data) {
  localStorage.setItem("userData", JSON.stringify(data));
  console.log("saveUserData called with data:", data)
}

function loadUserDataFromLocalStorage() {
  const userDataJSON = localStorage.getItem("userData");
  return userDataJSON ? JSON.parse(userDataJSON) : {};
}

function getRemainingTime() {
  const timerDisplay = document.getElementById("selected-option4");
  const timeParts = timerDisplay.textContent.split(":");

  if (timeParts.length !== 3) {
    return 0;
  }

  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  const seconds = parseInt(timeParts[2], 10);

  // Check if there is any remaining time stored in local storage
  const data = loadUserDataFromLocalStorage();
  if (data.remainingTime) {
    return data.remainingTime;
  }

  return hours * 3600 + minutes * 60 + seconds;
}


function loadUserData() {
  const data = loadUserDataFromLocalStorage();
  let remainingTime = 0;

  if (data.selectOne) {
    document.getElementById("selected-option").textContent = data.selectOne;
    document.querySelector(`input[name="selectOne"][value="${data.selectOne}"]`).checked = true;
  }
  if (data.oneOption) {
    document.getElementById("selected-option2").textContent = data.oneOption;
    document.querySelector(`input[name="oneOption"][value="${data.oneOption}"]`).checked = true;
  }
  if (data.tempature) {
    document.getElementById("selected-option3").textContent = data.tempature + "°C";
    document.getElementById("temp-slider").value = data.tempature;
  }
  if (data.postalCode) {
    document.getElementById("postal-code").value = data.postalCode;
  }
  if (data.tempHours) {
    document.getElementById("hours").value = data.tempHours;
  }
  if (data.tempMinutes) {
    document.getElementById("minutes").value = data.tempMinutes;
  }

  if (data.remainingTime) {
    remainingTime = data.remainingTime;
  } else if (data.timerEndTime) {
    remainingTime = Math.max(
      0,
      Math.floor((new Date(data.timerEndTime) - new Date()) / 1000)
    );
  }

  if (remainingTime > 0) {
    startCountdownTimer(remainingTime);
  } else if (data.timerEndTime) {
    const timerEndTime = new Date(data.timerEndTime);
    remainingTime = Math.max(
      0,
      Math.floor((timerEndTime - new Date()) / 1000)
    );
    startCountdownTimer(remainingTime);
  }
}


function startCountdownTimer(remainingTime) {
  console.log("startCountdownTimer called with remainingTime:", remainingTime);
  const timerDisplay = document.getElementById("selected-option4");

  if (countdownTimer) {
    clearInterval(countdownTimer);
  }


  countdownTimer = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(countdownTimer);
      timerDisplay.innerHTML = "";
    } else {
      remainingTime--;
      const hours = Math.floor(remainingTime / 3600);
      const minutes = Math.floor((remainingTime % 3600) / 60);
      const seconds = remainingTime % 60;
      timerDisplay.innerHTML = `${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(
        2,
        "0"
      )}`;
    }
  }, 1000);
}
  
  
  
function handleSubmit() {
  const selectOneValue = document.querySelector(
    'input[name="selectOne"]:checked'
  ).value;
  const formData = new FormData(document.querySelector("form"));
  const timerEndTime = new Date(
    Date.now() + getRemainingTime() * 1000
  ).toISOString();

  // Clear the existing countdown timer
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }

  // Calculate the new remaining time based on the new duration selected by the user
  const durationHoursValue = parseInt(formData.get("tempHours"), 10) || 0;
  const durationMinutesValue = parseInt(formData.get("tempMinutes"), 10) || 0;
  let remainingTime = durationHoursValue * 3600 + durationMinutesValue * 60;

  console.log('durationHoursValue:', durationHoursValue);
  console.log('durationMinutesValue:', durationMinutesValue);


  // Save the remaining time and timer end time in local storage
  const data = {
    selectOne: selectOneValue,
    postalCode: formData.get("postalCode"),
    oneOption: formData.get("oneOption"),
    tempature: formData.get("tempature"),
    tempHours: formData.get("tempHours"),
    tempMinutes: formData.get("tempMinutes"),
    remainingTime: remainingTime,
    timerEndTime: timerEndTime,
  };
  saveUserData(data);

  // Load the user data from localStorage and update the page
  loadUserData();


  // Navigate back to the home page
  window.history.pushState({}, "", "/");

  console.log("handleSubmit called");
}


      function resetForm() {
        // Reset form values
        document.getElementById("selected-option").textContent = "Off";
        document.getElementById("selected-option2").textContent = "Off";
        document.getElementById("selected-option3").textContent = "19°C";
        document.getElementById("postal-code").value = "A1A 1A1";
        document.getElementById("hours").value = "";
        document.getElementById("minutes").value = "";
        document.getElementById("selected-option4").innerHTML = "";
      
        // Reset radio buttons
        const radioButtons1 = document.getElementsByName("selectOne");
        for (const radio of radioButtons1) {
          if (radio.value === "Off") {
            radio.checked = true;
            break;
          }
        }
      
        const radioButtons2 = document.getElementsByName("oneOption");
        for (const radio of radioButtons2) {
          if (radio.value === "Off") {
            radio.checked = true;
            break;
          }
        }
      
        // Reset temperature slider
        document.getElementById("temp-slider").value = 19;
      
        // Clear the countdown timer
        if (countdownTimer) {
          clearInterval(countdownTimer);
        }
      
        // Remove data from localStorage
        localStorage.removeItem("userData");
      }
      
      
    // Add event listener for popstate event to handle when user navigates back or forward
    window.addEventListener("load", () => {
      clearInterval(countdownTimer);
      loadUserData();
    });
  
  


 //loads DOM
window.addEventListener("DOMContentLoaded", (event) => {
  loadUserData();
  if (countdownTimer) {
    startCountdownTimer(getRemainingTime());
  }
  
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

    handleSubmit();
  });
  
  //when button is clicked submits second set of options
  const form2 = document.querySelector(".postTemp");
  const submitButton3 = document.getElementById("submit-3");
submitButton3.addEventListener("click", (event) => {
  event.preventDefault();
  const selectedValue2 = document.querySelector(
    'input[name="oneOption"]:checked'
  ).value;
  const selectedOption2 = document.getElementById("selected-option2");
  selectedOption2.innerHTML = "<strong>" + selectedValue2 + "</strong>";
  selectedOption2.textContent = selectedValue2;

  /*// Get the values of the hours and minutes input elements
  const tempHours = document.getElementById("hours").value;
  const tempMinutes = document.getElementById("minutes").value;

  // Start the countdown timer
  const timerDisplay = document.getElementById("selected-option4");
  const timerDuration = tempHours * 3600 + tempMinutes * 60; // duration in seconds
  let remainingTime = timerDuration;

  const timerInterval = setInterval(() => {
    const initialTemp = tempInput.value;
    const tempDisplay = document.getElementById("selected-option3");
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
  }, 1000);*/

  handleSubmit();
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
  submitButton3.addEventListener("click", function (event) {
    event.preventDefault();
    const tempValue = tempInput.value;
  
    // Set the new temperature and display it on the page
    const tempDisplay = document.getElementById("selected-option3");
    tempDisplay.innerHTML = `${tempValue}°C`;
    const initialTemp = tempInput.defaultValue;
  
  });
  

// Add event listener for popstate event to handle when user navigates back or forward
window.addEventListener("popstate", () => {
  clearInterval(countdownTimer);
  loadUserData();
});

    
  
    

  
  
  
});
  








  
  
  
  




