import { getSearchMatches } from "../api/api-config.js";

const form = document.getElementById('search-form');
const search = document.getElementById('search');
const body = document.querySelector('#body');
const suggestionList = ["Batman", "The Great Escape", "Interstellar", "In Time"];

window.addEventListener('load', () => {
  setTimeout(() => {
    animateSuggestions();
    setInterval(() => {
      animateSuggestions();
    }, 15000);
  }, 3000);

  function animateSuggestions() {
    if (suggestionList.length > 0) {
      let totalDuration = 0;
      suggestionList.forEach((suggestion, index) => {
        const length = suggestion.length;
        if (length > 0) {
          for (let i = 0; i < length; i++) {
            setTimeout(() => {
              search.placeholder = suggestion.slice(0, i + 1);
            }, totalDuration + 200);
            totalDuration += 200;
          }
        }
      });
      setTimeout(() => {
        search.placeholder = 'Search Movies';
      }, totalDuration + 500);
    }
  }
});

const getMatches = async (dialogEl) => {
  const matches = await getSearchMatches(search.value);
  if(matches.results.length == 0){
    dialogEl.innerHTML += "<h2>No results found!</h2>"
  }
  else{
    const matchListEl = document.createElement('ul');
    matches.results.forEach(match => {
      matchListEl.innerHTML += `
        <li>
          <a href="movie.html?id=${match.id}">
            <div class="flex-space-between match-item">
              <span>${match.title}</span>
              <div class="search-movie-container">
                <span>${match.release_date ? new Date(match.release_date).getFullYear() : ""}</span>
                <span class="margin-left">${match.original_language}</span>
              </div>
            </div>
          </a>
        </li>`;
    });
    dialogEl.appendChild(matchListEl);
  }
  const closeBtn = document.createElement('button');
  closeBtn.classList.add("close-modal-btn")
  closeBtn.innerHTML = `<i class="fa-solid fa-x"></i>`;
  closeBtn.addEventListener("click", () => {
    body.classList.remove('modal-open');
    dialogEl.close();
  });
  dialogEl.appendChild(closeBtn);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const dialog = document.createElement('dialog');
  dialog.classList.add('dialog');
  body.appendChild(dialog);
  body.classList.add('modal-open');
  await getMatches(dialog);
  dialog.show();
});
