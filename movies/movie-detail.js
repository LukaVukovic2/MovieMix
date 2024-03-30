import { fetchMovies } from "../api/api-config.js"

const movieDetail = document.querySelector('.movie-detail');
let selectedMovie;
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const findMovie = async () => {
  try {
    const moviesData = await fetchMovies();
    if (moviesData) {
      selectedMovie = moviesData.results.find(movie => movie.id === +id);
      if (selectedMovie) {
        movieDetail.innerHTML = `
          <img class="img" src="https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}" alt="Image">
          
          <h2>${selectedMovie.title ? selectedMovie.title : selectedMovie.name}</h2>
          <p>${selectedMovie.overview}</p>
        `
      } else {
        movieDetail.innerHTML = "Movie not found!";
      }
    } else {
      movieDetail.innerHTML = "Movie not found!";
    }
  } catch (error) {
    console.error('Error fetching movie:', error);
  }
};

findMovie()