
//checks if valid email has been entered
  function validateEmail() {
    var email = document.getElementById("email").value;
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    submitButton.addEventListener("click", (event) => {
      if (re.test !== email) {
        alert("Invalid Email Address");
      }
    });
  }

  function loadProfileData() {
    const profileDataJSON = localStorage.getItem("profileData");
    const profileData = profileDataJSON ? JSON.parse(profileDataJSON) : {};
  
    if (profileData.fname) {
      document.getElementById("fname").value = profileData.fname;
    }
    if (profileData.lname) {
      document.getElementById("lname").value = profileData.lname;
    }
    if (profileData.birthday) {
      document.getElementById("birthday").value = profileData.birthday;
    }
    if (profileData.email) {
      document.getElementById("email").value = profileData.email;
    }
    if (profileData.password) {
      document.getElementById("password").value = profileData.password;
      document.getElementById("confirm-password").value = profileData.password;
    }
  }

  function saveProfileData() {
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const birthday = document.getElementById("birthday").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
  
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    const profileData = {
      fname,
      lname,
      birthday,
      email,
      password,
    };
  
    localStorage.setItem("profileData", JSON.stringify(profileData));
  }

  function resetProfileData() {
    const personalInfoForms = document.querySelectorAll(".pinfo");
    personalInfoForms.forEach((form) => form.reset());
  }
  



  window.addEventListener("DOMContentLoaded", (event) => {
    loadProfileData();
    const dateDisplay = document.getElementById("date");
  //gets date and time
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
  //displays date and time
    dateDisplay.innerHTML = ` Date: ${year}-${
      month + 1
    }-${day}<br> Time: ${hours}:${minutes}`;
  //defines password variables
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
  //checks if passwords match and if not displays a message
    const submitButton = document.querySelector("#submit-password");
    submitButton.addEventListener("click", (event) => {
      if (password.value !== confirmPassword.value) {
        event.preventDefault();
        alert("Passwords don't match.");
      }
      saveProfileData();
    });


    const resetButton = document.querySelector("input[type='reset']");
    resetButton.addEventListener("click", (event) => {
      resetProfileData();
    });
  
  });