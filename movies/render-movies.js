import { fetchMovies } from "../api/api-config.js"

let moviesData;
const moviesContainer = document.querySelector('.swiper-wrapper');

const displayMovies = async () => {
  moviesData = await fetchMovies();

  if (moviesData) {
    console.log(moviesData);
    moviesData.results.forEach((movie) => {
      const particularMovie = document.createElement('div');
      particularMovie.classList.add('swiper-slide');
      particularMovie.innerHTML += 
        ` <a href="./movie.html?id=${movie.id}"><img src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" class="img" alt="Image"></a>
          <div class="movie-info">
            <p>${movie.title ? movie.title : movie.name}</p>
            <p class="movie-rating ${getColor(movie.vote_average)}">${movie.vote_average.toFixed(2)}</p>
          </div>`
      moviesContainer.appendChild(particularMovie);
    });
  } else {
    console.log('Failed to fetch movies data');
  }
};

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

displayMovies();