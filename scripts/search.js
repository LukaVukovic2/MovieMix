import { getSearchMatches } from "../api/api-config.js";

const form = document.getElementById('search-form');
const search = document.getElementById('search');
const body = document.querySelector('#body');

const getMatches = async (dialogEl) => {
  const matches = await getSearchMatches(search.value);
  if(matches.results.length == 0){
    dialogEl.innerHTML += "<h2 style='color:#e50914;'>No results found!</h2>"
  }
  else{
    const matchListEl = document.createElement('ul');
    matches.results.forEach(match => {
      matchListEl.innerHTML += `
        <li>
          <a href="movie.html?id=${match.id}">
            <div class="flex-space-between match-item">
              <span>${match.title}</span>
              <span>
                <span>${match.release_date ? new Date(match.release_date).getFullYear() : ""}</span>
                <span class="margin-left">${match.original_language}</span>
              </span>
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
