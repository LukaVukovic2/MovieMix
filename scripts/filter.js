const filterModalBtn = document.querySelector('.filter-modal-btn');
const body = document.getElementById('body');

filterModalBtn.addEventListener("click", async () =>{
  const dialog = document.createElement('dialog');
  dialog.classList.add('dialog');
  body.classList.add('modal-open');
  const closeBtn = document.createElement('button');
  closeBtn.classList.add("close-modal-btn")
  closeBtn.innerHTML = `<i class="fa-solid fa-x"></i>`;
  closeBtn.addEventListener("click", () => {
    body.classList.remove('modal-open');
    dialog.close();
  });
  dialog.appendChild(closeBtn);
  showFilters(dialog);
  body.appendChild(dialog);
  dialog.show();
})

function showFilters(dialogEl){
  const filterOptions = document.createElement("form");
  filterOptions.innerHTML = `
  <label for="">Vote average
  </label><br>
  <div id="slider-vote"></div>

  <label for="">Runtime
  </label><br>
  <div id="slider-runtime"></div>

  <label for="">Release year
  </label><br>
  <div id="slider-release"></div>

  <p>Language</p>
  <select name="" id="language-select">
    <option value="" selected disabled>Choose language</option>
    <option value="ar-AE">العربية</option>
    <option value="bg-BG">български</option>
    <option value="bn-BD">বাংলা</option>
    <option value="ca-ES">Català</option>
    <option value="ch-GU">Chamorro</option>
    <option value="cs-CZ">čeština</option>
    <option value="da-DK">dansk</option>
    <option value="de-DE">Deutsch</option>
    <option value="el-GR">Ελληνικά</option>
    <option value="en-US">English</option>
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
  </select>

  <p>Sort by: </p>

  <select id="select-sort">
    <option value="popularity.asc">Popularity ascending</option>
    <option value="popularity.desc">Popularity descending</option>
    <option value="revenue.asc">Revenue ascending</option>
    <option value="revenue.desc">Revenue descending</option>
    <option value="primary_release_date.asc">Primary release date ascending</option>
    <option value="primary_release_date.desc">Primary release date descending</option>
    <option value="vote_average.asc">Vote average ascending</option>
    <option value="vote_average.desc">Vote average descending</option>
    <option value="vote_count.asc">Vote count ascending</option>
    <option value="vote_count.desc">Vote count descending</option>
  </select><br><br>
  <input type="submit" value="Apply filters">
  `;
  dialogEl.appendChild(filterOptions);
}

let sliderVote = document.getElementById('slider-vote');

noUiSlider.create(sliderVote, {
    start: [0, 0],
    connect: true,
    step: 0.25,
    range: {
        'min': 1,
        'max': 10
    }
});

sliderVote.noUiSlider.on("update", function (values) {
  let min = parseFloat(values[0]);
  let max = parseFloat(values[1]);
  console.log("Less value: " + min);
  console.log("Greater value: " + max);
});

let sliderRuntime = document.getElementById('slider-runtime');

noUiSlider.create(sliderRuntime, {
    start: [0, 0],
    step: 1,
    connect: true,
    range: {
        'min': 1,
        'max': 200
    }
});

sliderRuntime.noUiSlider.on("update", function (values) {
  let min = parseFloat(values[0]);
  let max = parseFloat(values[1]);
  console.log("Less value: " + min);
  console.log("Greater value: " + max);
});

let sliderRelease = document.getElementById('slider-release');

noUiSlider.create(sliderRelease, {
    start: [0, 0],
    connect: true,
    step: 1,
    range: {
        'min': 1874,
        'max': new Date().getFullYear()
    }
});

sliderRelease.noUiSlider.on("update", function (values) {
  let min = parseFloat(values[0]);
  let max = parseFloat(values[1]);
  console.log("Less value: " + min);
  console.log("Greater value: " + max);
});