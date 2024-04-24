import { fetchMovies, startGuestSession, getGenresList } from "../api/api-config.js"

const moviesContainer = document.querySelector('.movie-wrapper');
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
  moviesData = await fetchMovies();

  if (moviesData) {
    moviesData.results.forEach(movie => {
      const movieEl = document.createElement('div');
      movieEl.classList.add('swiper-slide');
      movieEl.innerHTML += 
        ` <a href="./movie.html?id=${movie.id}"><img src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" class="img" alt="Image"></a>
          <div class="movie-info flex-space-between">
            <p>${movie.title ? movie.title : movie.name}</p>
            <p class="movie-rating ${getColor(movie.vote_average)}">${movie.vote_average.toFixed(2)} <i class="fa-regular fa-star"></i></p>
          </div>
          `
      moviesContainer.appendChild(movieEl);
    });
  } else {
    console.log('Failed to fetch movies data');
  }
};

displayMovies();

function getColor(rating){
  if(rating > 8){
    return "green";
  }
  else if(rating > 6){
    return "yellow";
  }
  else if(rating > 4){
    return "orange";
  }
  else {
    return "red";
  }
}

var swiper1 = new Swiper('.movie-container', {
  slidesPerView: 4.5,
  spaceBetween: 10,
  slidesPerGroup: 4,
  navigation: {
    nextEl: '#movies-next',
    prevEl: '#movies-prev',
  },
});
