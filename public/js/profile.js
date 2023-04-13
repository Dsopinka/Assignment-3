window.addEventListener("DOMContentLoaded", (event) => {
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
  });
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
});
