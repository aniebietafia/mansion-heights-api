const form = document.querySelector("form");
const password = document.getElementById("password");
const messageContainer = document.querySelector(".message-container");
const message = document.getElementById("message");

let isValid = false;

const validateForm = () => {
  // Using contraint API
  isValid = form.checkValidity();
  if (!isValid) {
    message.textContent = "Please fill out all fields.";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
  }
};

const processFormData = (e) => {
  //   e.preventDefault();
  //   Validate Form
  validateForm();
};

// Event Listener
form.addEventListener("submit", processFormData);
