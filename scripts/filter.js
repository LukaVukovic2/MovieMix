import { getMoviesByGenre } from "../api/api-config.js";
import { id, getGenre } from "./genres.js"

const filterModalBtn = document.querySelector('.filter-modal-btn');
const body = document.getElementById('body');
let sliderVote;
let sliderRuntime;
let sliderRelease;
let filterForm;
let dialog;
let movies;
let filtersArray = [];

let filters = {
  vote: [1, 10],
  runtime: [1, 200],
  release: [1874, new Date().getFullYear()],
  language: "en-US",
  sortBy: "vote_average.desc"
}

const getMovies = async () =>{
  movies = await getMoviesByGenre(id, 1, filters);
  getGenre(1);
  body.classList.remove('modal-open');
  dialog.close();
  dialog.innerHTML = "";
  filtersArray.splice(0, filtersArray.length);
}

filterModalBtn.addEventListener("click", async () => {
  dialog = document.createElement('dialog');
  dialog.classList.add('dialog');
  body.classList.add('modal-open');
  const closeBtn = document.createElement('button');
  closeBtn.classList.add("close-modal-btn")
  closeBtn.innerHTML = `<i class="fa-solid fa-x"></i>`;
  closeBtn.addEventListener("click", () => {
    body.classList.remove('modal-open');
    dialog.close();
    dialog.innerHTML = "";
    filtersArray.splice(0, filtersArray.length);
  });
  dialog.appendChild(closeBtn);
  body.appendChild(dialog);
  showFilters(dialog);
  dialog.show();
});

function showFilters(dialogEl){
  filterForm = document.createElement("form");
  filterForm.classList.add("filter-form");
  filterForm.id = "filter-form";
  filterForm.innerHTML = `
    <span class="filter-title">Vote average</span>
    <div id="inputValue1" class="slider-vote slider-el filter-input" data-id="sliderVote" data-filter="Vote average" data-index="1" ></div>
  `;
  const confirmVoteBtn = createConfirmBtn(1);
  filterForm.appendChild(confirmVoteBtn);

  filterForm.innerHTML += `
    <span class="filter-title">Runtime (in minutes)</span>
    <div id="inputValue2" class="slider-runtime slider-el filter-input" data-id="sliderRuntime" data-filter="Runtime" data-index="2"></div>
  `;

  const confirmRuntimeBtn = createConfirmBtn(2);
  filterForm.appendChild(confirmRuntimeBtn);

  filterForm.innerHTML += `
    <span class="filter-title">Release year</span>
    <div id="inputValue3" class="slider-release slider-el filter-input" data-id="sliderRelease" data-filter="Release year" data-index="3"></div>
  `;

  const confirmReleaseBtn = createConfirmBtn(3);
  filterForm.appendChild(confirmReleaseBtn);

  filterForm.innerHTML += `
    <span class="filter-title">Language</span>
    <select class="filter-input" name="" id="inputValue4" data-filter="Language" data-index="4">
      <option value="ar-AE">العربية</option>
      <option value="bg-BG">български</option>
      <option value="bn-BD">বাংলা</option>
      <option value="ca-ES">Català</option>
      <option value="ch-GU">Chamorro</option>
      <option value="cs-CZ">čeština</option>
      <option value="da-DK">dansk</option>
      <option value="de-DE">Deutsch</option>
      <option value="el-GR">Ελληνικά</option>
      <option value="en-US" selected>English</option>
      <option value="eo-EO">Esperanto</option>
      <option value="es-ES">español</option>
      <option value="fa-IR">فارسی</option>
      <option value="fi-FI">suomi</option>
      <option value="fr-FR">français</option>
      <option value="he-IL">עברית</option>
      <option value="hi-IN">हिन्दी</option>
      <option value="hu-HU">magyar</option>
      <option value="id-ID">Bahasa Indonesia</option>
      <option value="it-IT">italiano</option>
      <option value="ja-JP">日本語</option>
      <option value="ka-GE">ქართული</option>
      <option value="kn-IN">ಕನ್ನಡ</option>
      <option value="ko-KR">한국어</option>
      <option value="lt-LT">Lietuvių</option>
      <option value="ml-IN">മലയാളം</option>
      <option value="nb-NO">Norsk bokmål</option>
      <option value="nl-NL">Nederlands</option>
      <option value="no-NO">Norsk</option>
      <option value="pl-PL">polski</option>
      <option value="pt-BR">português do Brasil</option>
      <option value="pt-PT">português</option>
      <option value="ro-RO">română</option>
      <option value="ru-RU">русский</option>
      <option value="sk-SK">slovenčina</option>
      <option value="sl-SI">slovenščina</option>
      <option value="sr-RS">српски</option>
      <option value="sv-SE">svenska</option>
      <option value="ta-IN">தமிழ்</option>
      <option value="te-IN">తెలుగు</option>
      <option value="th-TH">ไทย</option>
      <option value="tr-TR">Türkçe</option>
      <option value="uk-UA">українська</option>
      <option value="vi-VN">Tiếng Việt</option>
      <option value="zh-CN">中文（简体）</option>
      <option value="zh-TW">中文（繁體）</option>
    </select>`;
    
    const confirmLanguageBtn = createConfirmBtn(4)
    filterForm.appendChild(confirmLanguageBtn);

    filterForm.innerHTML += `
      <span class="filter-title">Sort by:</span>
      <select class="filter-input" id="inputValue5" data-filter="Sorting" data-index="5">
        <option value="popularity.asc">Popularity ascending</option>
        <option value="popularity.desc">Popularity descending</option>
        <option value="revenue.asc">Revenue ascending</option>
        <option value="revenue.desc">Revenue descending</option>
        <option value="primary_release_date.asc">Primary release date ascending</option>
        <option value="primary_release_date.desc">Primary release date descending</option>
        <option value="vote_average.asc">Vote average ascending</option>
        <option value="vote_average.desc" selected>Vote average descending</option>
        <option value="vote_count.asc">Vote count ascending</option>
        <option value="vote_count.desc">Vote count descending</option>
      </select>
    `;
  
    const confirmSortBtn = createConfirmBtn(5);
    filterForm.appendChild(confirmSortBtn);

    filterForm.innerHTML += `<br><br>
      <input class="apply-filters-btn" type="submit" value="Apply filters">
      <input class="reset-filters-btn" type="button" value="Reset filters">
    `;
    const addedFilters = document.createElement("div");
    addedFilters.classList.add("added-filters-el");
    addedFilters.innerHTML = "<h4>Your filters</h4>";
    dialogEl.appendChild(addedFilters);
    dialogEl.appendChild(filterForm);

    const applyFiltersBtn = document.querySelector(".apply-filters-btn");
    const resetFiltersBtn = document.querySelector(".reset-filters-btn");

    applyFiltersBtn.addEventListener("click", (e) =>{
      e.preventDefault();
      applyFilters();
    });

    resetFiltersBtn.addEventListener("click", ()=>{
      filterForm.reset();
      sliderVote.noUiSlider.reset();
      sliderRuntime.noUiSlider.reset();
      sliderRelease.noUiSlider.reset();
      const filterInfo = document.querySelector(".added-filters-el");
      filterInfo.innerHTML = "<h4>Your filters</h4>";
      filtersArray.splice(0, filtersArray.length);
    })

    const confirmFilterBtns = document.querySelectorAll('.confirm-btn');
  
    confirmFilterBtns.forEach(button => {
      button.innerHTML = "Confirm";
      button.addEventListener("click", (e) => {
        e.preventDefault();
    
        let value;
        const index = button.getAttribute('data-index');
        const inputField = document.getElementById(`inputValue${index}`)
    
        if (inputField.tagName === "SELECT") { 
          value = inputField.options[inputField.selectedIndex].innerHTML;
          if(inputField.getAttribute("data-filter") == "Language"){
            filters.language = inputField.value;
          }
          else{
            filters.sortBy = inputField.value;
          }
        } 
        else {
          const sliderId = inputField.getAttribute('data-id');
          let slider;
          if (sliderId === "sliderVote") {
            slider = sliderVote;
            value = slider.noUiSlider.get()[0] + "-" + slider.noUiSlider.get()[1];
            filters.vote = slider.noUiSlider.get();
          } 
          else if (sliderId === "sliderRuntime") {
            slider = sliderRuntime;
            value = parseFloat(slider.noUiSlider.get()[0]) + "min-" + parseFloat(slider.noUiSlider.get()[1]) + "min";
            filters.runtime = slider.noUiSlider.get();
          } 
          else {
            slider = sliderRelease;
            value = parseFloat(slider.noUiSlider.get()[0]) + "-" + parseFloat(slider.noUiSlider.get()[1]);
            filters.release = slider.noUiSlider.get();
          }
        }
        const filter = inputField.getAttribute("data-filter");
        const filterInfo = document.createElement("span");
        filterInfo.classList.add("filter-info");
        filterInfo.setAttribute("data-filter", filter);
        filterInfo.setAttribute("data-index", index);
        filterInfo.innerHTML = filter + ": " + value;
    
        const existingFilter = addedFilters.querySelector(`span[data-filter="${filter}"]`);
        if (existingFilter) {
          const existingIndex = filtersArray.indexOf(filter);
          filtersArray.splice(existingIndex, 1);
          existingFilter.remove();
        }

        addedFilters.appendChild(filterInfo);
        filtersArray.push(value);
        if(filtersArray.length !== 1){
          filterInfo.innerHTML = ", " + filter + ": " + value;
          addedFilters.appendChild(filterInfo);
        }
        else{
          filterInfo.innerHTML = filter + ": " + value;
          addedFilters.appendChild(filterInfo);
        }
      });
    }
  );
  createSliders();
}

function createSliders() {
  sliderVote = document.querySelector('.slider-vote');
  noUiSlider.create(sliderVote, {
    start: [1, 10],
    connect: true,
    step: 0.25,
    range: {
      'min': 1,
      'max': 10
    }
  });

  sliderRuntime = document.querySelector('.slider-runtime');
  noUiSlider.create(sliderRuntime, {
    start: [1, 200],
    step: 1,
    connect: true,
    range: {
      'min': 1,
      'max': 200
    }
  });


  sliderRelease = document.querySelector('.slider-release');
  noUiSlider.create(sliderRelease, {
    start: [1874, new Date().getFullYear()],
    connect: true,
    step: 1,
    range: {
      'min': 1874,
      'max': new Date().getFullYear()
    }
  });

  const minHandle = document.querySelectorAll('.noUi-handle-lower .noUi-touch-area');
  const maxHandle = document.querySelectorAll('.noUi-handle-upper .noUi-touch-area');

  sliderVote.noUiSlider.on("update", function (values) {
    let min = parseFloat(values[0]);
    let max = parseFloat(values[1]);
    minHandle[0].innerHTML = min;
    maxHandle[0].innerHTML = max;
  });

  sliderRuntime.noUiSlider.on("update", function (values) {
    let min = parseFloat(values[0]);
    let max = parseFloat(values[1]);
    minHandle[1].innerHTML = min;
    maxHandle[1].innerHTML = max;
  });

  sliderRelease.noUiSlider.on("update", function (values) {
    let min = parseFloat(values[0]);
    let max = parseFloat(values[1]);
    minHandle[2].innerHTML = min;
    maxHandle[2].innerHTML = max;
  });
}

function applyFilters(){
  getMovies();
}

function createConfirmBtn(dataIndex){
  const confirmBtn = document.createElement("button");
  confirmBtn.classList.add("confirm-btn");
  confirmBtn.setAttribute("data-index", dataIndex); 
  return confirmBtn;
}

export { movies, filters }