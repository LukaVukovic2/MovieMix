import { fetchMovies } from "../api/api-config.js"

let moviesData;
const moviesContainer = document.querySelector('.movie-container');

const displayMovies = async () => {
  moviesData = await fetchMovies();

  if (moviesData) {
    console.log(moviesData);
    moviesData.results.forEach((movie) => {
      const particularMovie = document.createElement('div');
      particularMovie.style.display = "inline-block";
      particularMovie.classList.add('movie');
      particularMovie.innerHTML += `<a href="./movie.html?id=${movie.id}"><img src="https://image.tmdb.org/t/p/original${movie.poster_path}" class="img" alt="Image"></a><br>`
      moviesContainer.appendChild(particularMovie);
    });
  } else {
    console.log('Failed to fetch movies data');
  }
};

displayMovies();