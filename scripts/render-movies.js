import { fetchMovies, startGuestSession, getGenresList } from "../api/api-config.js"
import { getColor } from "./color.js";

const movieWrapper = document.querySelector('.movie-wrapper');
const genresContainer = document.querySelector('.genres-list-container');
let moviesData;
let session;

const startSession = async()=>{
  session = await startGuestSession();
  const miliseconds = new Date(session.expires_at).getTime();
  localStorage.setItem("expirationTime", JSON.stringify(miliseconds));
  localStorage.setItem("guestSessionId", session.guest_session_id);
  console.log(session);
}

if(localStorage.getItem("expirationTime") < new Date().getTime()){
  startSession();
}

const getGenres = async() =>{
  const genres = await getGenresList();
  if(genres){
    genres.genres.forEach(genre =>{
      genresContainer.innerHTML += `
        <a class="genre-name" href="genre.html?id=${genre.id}&name=${genre.name}">
          ${genre.name}
        </a>
      ` 
    })
  }
}

getGenres();

const displayMovies = async () => {
  const loadingSpinner = document.querySelector(".loading-spinner");
  loadingSpinner.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
  moviesData = await fetchMovies();
  loadingSpinner.innerHTML = "";
  if (moviesData) {
    movieWrapper.innerHTML = "";
    moviesData.results.forEach(movie => {
      const movieEl = document.createElement('div');
      movieEl.classList.add('swiper-slide');
      movieEl.innerHTML += 
        ` <a href="./movie.html?id=${movie.id}"><img src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" loading="lazy" class="img" alt="Image"></a>
          <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          <div class="movie-info flex-space-between">
            <p>${movie.title ? movie.title : movie.name}</p>
            <p class="movie-rating ${getColor(movie.vote_average)}">${movie.vote_average.toFixed(2)} <i class="fa-regular fa-star"></i></p>
          </div>
          `
      movieWrapper.appendChild(movieEl);
    });
  } else {
    console.log('Failed to fetch movies data');
  }
};

displayMovies();

var swiper1 = new Swiper('.movie-container', {
  slidesPerView: 4.5,
  spaceBetween: 10,
  slidesPerGroup: 4,
  navigation: {
    nextEl: '#movies-next',
    prevEl: '#movies-prev',
  },
  breakpoints: {
    100: {
      slidesPerView: 1,
      slidesPerGroup: 1
    },
    550: {
      slidesPerView: 1.5,
      slidesPerGroup: 1
    },
    700: {
      slidesPerView: 2,
      slidesPerGroup: 2
    },
    850: {
      slidesPerView: 2.5,
      slidesPerGroup: 2
    },
    1150: {
      slidesPerView: 3,
      slidesPerGroup: 3
    },
    1450: {
      slidesPerView: 3.5,
      slidesPerGroup: 3
    },
    1500: {
      slidesPerView: 4.5,
      slidesPerGroup: 4
    }
  }
});
