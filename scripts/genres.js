import { getMoviesByGenre } from "../api/api-config.js";
import { movies, filters } from "./filter.js";
import { getColor } from "./color.js";

const params = new URLSearchParams(window.location.search);
const filterModalBtn = document.querySelector('.filter-modal-btn');
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
let isFetched = false;


const getGenre = async (pageNumber) => {
  try {
    const loadingSpinner = document.querySelector(".loading-spinner");
    loadingSpinner.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;

    let moviesByPage = await getMoviesByGenre(id, pageNumber, filters);
    loadingSpinner.innerHTML = "";
    
    if(movies && !isFetched){
      moviesByPage = movies;
      isAdded = false;
      isFetched = true;
    }
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
      filterModalBtn.style.display = "inline-block";
      moviesByPage.results.forEach(movie => {
        container.innerHTML += `
          <a href="movie.html?id=${movie.id}" class="movie-link">
            <div class="movie-container" style="background: url('https://image.tmdb.org/t/p/original${movie.backdrop_path}');">
              <div class="movie-data flex-space-between">
                <div>${movie.title}</div>
                <div class="movie-rating ${getColor(movie.vote_average)}">${movie.vote_average.toFixed(2)} 
                  <i class="fa-regular fa-star"></i>
                </div>
              </div>
            </div>
          </a>`
        }
      );
    }
  } catch (error) {
    console.error('Error fetching genre:', error);
  }
};

getGenre(page);

function addAllPages(){
  pagination.innerHTML = `
    <li id="previous-page" style="visibility: hidden;"><a href="#" aria-label=Previous><span aria-hidden=true>&laquo;</span></a></li>
    <li class='current-page active'><a href='#'>1</a></li>
  `;
  for (let i = 2; i <= totalPages; i++) {
    pagination.innerHTML += "<li class='current-page'><a href='#'>" + i + "</a></li>";
  }
  pagination.innerHTML += "<li id='next-page'><a href='#' aria-label=Next><span aria-hidden=true>&raquo;</span></a></li>";

  document.querySelectorAll(".current-page").forEach(pageNumber => {
    pageNumber.addEventListener("click", e => {
      showSelectedPage(e.target.text);
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

export{id, getGenre}