import { getMovieById, getCastInfo } from "../api/api-config.js"

const movieDetail = document.querySelector('.movie-detail');
const movieDetailWrapper = document.querySelector('.movie-detail-wrapper');
const castContainer = document.querySelector('.cast-container');
const container = document.querySelector('.container');
const movieExtraDesc = document.querySelector('.movie-extra-desc');
const tagline = document.querySelector('.tagline');
const genresEl = document.querySelector('.genres');
const castEl = document.querySelector('.cast-photos');

let movie;
let imgEl;
let hours;
let mins;
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const getMovie = async (id) => {
  try {
    container.style.height = "height: calc(100vh - 100px);"
    movie = await getMovieById(id);
    if (movie) {
      imgEl = document.createElement('div');
      imgEl.classList.add('img-container')
      imgEl.innerHTML = `
        <img src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" alt="movie image" class="movie-img">
      `
      container.insertBefore(imgEl, movieDetailWrapper);

      if(movie.tagline){
        tagline.innerHTML = `<i>${movie.tagline}</i>`;
      }
      else{
        tagline.style.display = "none";
      }

      movieDetail.innerHTML = 
      `
        <h2>${movie.title ? movie.title : movie.name}</h2>
        <p>${new Date(movie.release_date).getFullYear()} | ${getMovieDuration(movie.runtime)} | ${movie.genres[0].name}</p>
        <p>${movie.overview}</p>
      `;

      if(movie.genres){
        movie.genres.forEach(genre =>{
          genresEl.innerHTML += 
          `<div>${genre.name}</div>`;
        })
        movieExtraDesc.appendChild(genresEl);
      }
    }
    container.style.minHeight = imgEl.offsetHeight + 'px';
  } catch (error) {
    console.error(error);
    return null;
  }
}

getMovie(id);

if(id){
  try {
    const movieWithId = await getCastInfo(id);
    castContainer.innerHTML += `Starring: `;
    if (movieWithId) {
      movieWithId.cast.forEach((actor,index) => {
        if(index >= 3){
          return
        }
        castContainer.innerHTML +=  
        `
          ${index < 2 ? actor.name + ', ' : actor.name} 
        `
        castEl.innerHTML +=
        `
          <div>
            <a href="./actor.html?id=${actor.id}">
              <img src="https://image.tmdb.org/t/p/original${actor.profile_path}" alt="photo" class="img">
            </a>
          </div>
        `
      });
    } else {
      castContainer.innerHTML += " unknown";
    }
  } catch (error) {
    console.error('Cast is unknown', error);
  }
}

function getMovieDuration(minutes){
  if (minutes >= 60){
    hours = Math.floor(minutes / 60);
    mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }
  else{
    mins = minutes;
    return `${mins}`;
  }
}

window.addEventListener('resize', adjustHeight);


function adjustHeight(){
  if (imgEl && container && window.innerWidth > 600) {
    movieExtraDesc.style.display = "block";
    console.log(imgEl.offsetHeight)
    container.style.height = imgEl.clientHeight + 'px';
  }
  else if(window.innerWidth <= 600){
    movieExtraDesc.style.display = "none";
  }
}
