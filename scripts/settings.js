const form = document.getElementById('settings-form');
const selectedLanguage = document.getElementById('language');
const selectedRecommendation = document.getElementsByName('recommend');
const languageLS = localStorage.getItem("language");
const recommendLS = localStorage.getItem("recommend");
let recommend;

if(recommendLS && languageLS){
  selectedRecommendation.forEach(option =>{
    if(option.value == recommendLS){
      option.checked = "true";
    }
  })
  selectedLanguage.value = languageLS;
}

function validateForm(){
  console.log(selectedRecommendation)
  selectedRecommendation.forEach(option =>{

    if(option.checked){
      recommend = option.value;
    }
  })
  if(selectedLanguage.value === "default"){
    return false;
  }
  else{
    return true;
  }
}

form.addEventListener("submit", (e)=>{
  e.preventDefault();
  const isValid = validateForm();
  if(isValid){
    localStorage.setItem("language", selectedLanguage.value);
    localStorage.setItem("recommend", recommend);
    alert("Changes are applied!");
  }
  else{
    alert('Invalid form!');
  }
})