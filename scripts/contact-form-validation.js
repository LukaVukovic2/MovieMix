const contactForm = document.getElementById("contact-form");
const formSubmitBtn = document.getElementById("form-submit-btn");
const usernameEl = document.getElementById("username");
const emailEl = document.getElementById("email");
const subjectEl = document.getElementById("subject");
const messageEl = document.getElementById("message");
const usernameErrorEl = document.getElementById("username-error-el");
const emailErrorEl = document.getElementById("email-error-el");
const subjectErrorEl = document.getElementById("subject-error-el");
const messageErrorEl = document.getElementById("message-error-el");

formSubmitBtn.addEventListener("click", (e) =>{
  e.preventDefault();
  const valid = validateForm();
  if(valid){
    console.log("Username: " + usernameEl.value);
    console.log("Email: " + emailEl.value);
    console.log("Subject: " + subjectEl.value);
    console.log("Message: " + messageEl.value);
  }
  else{
    console.log("Form is invalid!");
  }
});

function validateForm(){
  let valid = true;
  if(usernameEl.value.length < 8){
    colorElement(usernameEl, usernameErrorEl);
    usernameErrorEl.innerHTML = "Username must have atleast 8 characters!<br>";
    valid = false;
  }
  else if(usernameErrorEl.innerHTML !== "" && usernameEl.value.length >= 8){
    removeErrorStyling(usernameEl, usernameErrorEl);
  }

  const emailValid = validateEmail(emailEl.value);
  if(!emailValid){
    colorElement(emailEl, emailErrorEl);
    emailErrorEl.innerHTML = "Email field is empty or invalid!<br>";
    valid = false;
  }
  else if(emailErrorEl.innerHTML !== "" && emailValid){
    removeErrorStyling(emailEl, emailErrorEl);
  }

  if(subjectEl.value.length == 0){
    colorElement(subjectEl, subjectErrorEl);
    subjectErrorEl.innerHTML = "Subject must be defined!<br>"
    valid = false;
  }
  else if(subjectErrorEl !== "" && subjectEl.value.length > 0){
    removeErrorStyling(subjectEl, subjectErrorEl);
  }

  if(messageEl.value.length == 0){
    colorElement(messageEl, messageErrorEl);
    messageErrorEl.innerHTML = "Message field can't be empty!<br>"
    valid = false;
  }
  else if(messageErrorEl.innerHTML !== "" && messageEl.value.length > 0){
    removeErrorStyling(messageEl, messageErrorEl);
  }

  return valid;
}

function colorElement(element, errorEl){
  element.style.border = "3px solid #FF3333";
  errorEl.style.color = "#FF3333";
}

function removeErrorStyling(element, errorEl){
  element.style.border = "1px solid #ccc";
  errorEl.innerHTML = "";
}

function validateEmail(email) {
  let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}