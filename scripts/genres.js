import { getMoviesByGenre } from "../api/api-config.js";

const params = new URLSearchParams(window.location.search);
let totalPages;
let totalResults;
let isAdded = false;
const id = params.get('id');
const genreName = params.get('name');
let page = 1;
const container = document.querySelector('.container');
const pagination = document.querySelector('.pagination');
const title = document.querySelector('.title');
let navPages;

pagination.innerHTML += "<li class='current-page active'><a href='#'>" + 1 + "</a></li>";

const getGenre = async (pageNumber) => {
  try {
    let moviesByPage = await getMoviesByGenre(id, pageNumber);
    totalPages = moviesByPage.total_pages;
    totalResults = moviesByPage.total_results;
    if(totalPages > 20){
      totalPages = 20;
      totalResults = 400;
    }
    title.innerHTML = `${genreName}: Top ${totalResults} movies`;
    if (moviesByPage.results && !isAdded) {
      addAllPages(moviesByPage.results.length);
    }
    if(moviesByPage.results){
      container.innerHTML = '';
      moviesByPage.results.forEach(movie => {
        container.innerHTML += `
        <a href="movie.html?id=${movie.id}>"
          <div class="movie-container" style="background: url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')">
            <div class="movie-data">
              <div>${movie.title}</div>
              <div class="movie-rating">${movie.vote_average.toFixed(2)} <i class="fa-regular fa-star"></i></div>
            </div>
          </div>
        </a>`
      });
    }
  } catch (error) {
    console.error('Error fetching genre:', error);
  }
};

getGenre(page);

function addAllPages(){
  
  for (let i = 2; i <= totalPages; i++) {
    pagination.innerHTML += "<li class='current-page'><a href='#'>" + i + "</a></li>";
  }
  pagination.innerHTML += "<li id='next-page'><a href='#' aria-label=Next><span aria-hidden=true>&raquo;</span></a></li>";

  document.querySelectorAll(".current-page").forEach(pageNumber => {
    pageNumber.addEventListener("click", e => {
      showSelectedPage(e.target.text)
    });
  });
  
  document.getElementById("next-page").addEventListener("click", showNextPage);
  document.getElementById("previous-page").addEventListener("click", showPreviousPage);
  isAdded = true;
}

function showNextPage(){
  const previousBtn = document.getElementById('previous-page');
  const nextBtn = document.getElementById('next-page')
  const activeElement = document.querySelector(".pagination li.active");
  navPages = document.querySelectorAll(".pagination li");
  let currentPage = Array.from(navPages).indexOf(activeElement);
  if(currentPage >= 1){
    previousBtn.style.visibility = "visible";
  }
  currentPage++;
  activeElement.classList.remove('active');

  getGenre(currentPage);
  const nextElement = activeElement.nextElementSibling;
  nextElement.classList.add('active');

  if(currentPage === totalPages){
    nextBtn.style.visibility = "hidden";
  }
  else{
    nextBtn.style.visibility = "visible";
  }
}

function showPreviousPage(){
  const previousBtn = document.getElementById('previous-page');
  const nextBtn = document.getElementById('next-page');
  const activeElement = document.querySelector(".pagination li.active");
  navPages = document.querySelectorAll(".pagination li");
  let currentPage = Array.from(navPages).indexOf(activeElement);
  if(currentPage <= totalPages){
    nextBtn.style.visibility = "visible";
  }
  currentPage--;
  if(currentPage === 1){
    previousBtn.style.visibility = "hidden";
  }
  else{
    previousBtn.style.visibility = "visible";
  }
  activeElement.classList.remove('active');
  getGenre(currentPage);
  const previousElement = activeElement.previousElementSibling;
  previousElement.classList.add('active');
}

function showSelectedPage(pageNumber){
  const previousBtn = document.getElementById('previous-page');
  const nextBtn = document.getElementById('next-page');
  const activeElement = document.querySelector(".pagination li.active");
  navPages = document.querySelectorAll(".pagination li");
  navPages.forEach((page, index) => {
    if (index == pageNumber) {
      const selectedNumber = page.children[0].parentElement;
      activeElement.classList.remove('active');
      getGenre(pageNumber);
      selectedNumber.classList.add('active');
      if(pageNumber == totalPages){
        nextBtn.style.visibility = "hidden";
        previousBtn.style.visibility = "visible";
      }
      else if(pageNumber == 1){
        previousBtn.style.visibility = "hidden";
        nextBtn.style.visibility = "visible";
      }
      else{
        nextBtn.style.visibility = "visible";
        previousBtn.style.visibility = "visible";
      } 
    }
  });
}