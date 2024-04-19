import { fetchMovies, startGuestSession, getLists } from "../api/api-config.js"

let moviesData;
let session;
let lists;
const moviesContainer = document.querySelector('.movie-wrapper');

const startSession = async()=>{
  session = await startGuestSession();
  const miliseconds = new Date(session.expires_at).getTime();
  localStorage.setItem("expirationTime", JSON.stringify(miliseconds));
  console.log(session);
}

console.log(new Date().toISOString())

if(localStorage.getItem("expirationTime") < new Date().getTime()){
  startSession();
}

const getGuestLists = async() =>{
  lists = await getLists();
  console.log(lists);
}

getGuestLists();

const displayMovies = async () => {
  moviesData = await fetchMovies();

  if (moviesData) {
    moviesData.results.forEach(movie => {
      const movieEl = document.createElement('div');
      movieEl.classList.add('swiper-slide');
      movieEl.innerHTML += 
        ` <a href="./movie.html?id=${movie.id}"><img src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" class="img" alt="Image"></a>
          <div class="movie-info">
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
