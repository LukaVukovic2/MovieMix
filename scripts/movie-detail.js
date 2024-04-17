import { getMovieById, getCastInfo } from "../api/api-config.js"

const movieDetail = document.querySelector('.movie-detail');
const movieDetailContainer = document.querySelector('.movie-detail-container');
const bgImage = document.querySelector('.bg-image');
const castContainer = document.querySelector('.cast-container');
const tagline = document.querySelector('.tagline');
const genresContainer = document.querySelector('.genres-container');
const castPhotosContainer = document.querySelector('.cast-photos-container');

let movie;
let hours;
let mins;
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const getMovie = async (id) => {
  try {
    movie = await getMovieById(id);
    if (movie instanceof Error) {
      bgImage.innerHTML = "This movie is probably new so we haven't got its data yet!";
      throw new Error('Failed to get movie');
    } 
    
    if (movie) {
      if(movie.backdrop_path){
        bgImage.classList.add('primary-photo');
        bgImage.style.background = `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`;
      }
      else{
        bgImage.classList.add('secondary-photo');
        bgImage.style.background = `url('https://image.tmdb.org/t/p/original${movie.poster_path}'`;
      }

      if(movie.tagline){
        tagline.innerHTML = `<i>${movie.tagline}</i><hr>`;
      }
      else{
        tagline.innerHTML = "<hr>";
      }

      movieDetail.innerHTML = 
      `
        <h2 class="no-margin">${movie.title ? movie.title : movie.name}</h2>
        <p>${new Date(movie.release_date).getFullYear()} | ${getMovieDuration(movie.runtime)} | ${movie.genres[0].name}</p>
        <p>${movie.overview}</p>
      `;

      if(movie.genres){
        genresContainer.innerHTML = "<h2>Genres</h2>";
        const genresEl = document.createElement('div');
        genresEl.classList.add('genres')
        
        movie.genres.forEach(genre =>{
          genresEl.innerHTML += 
          `<div style="border-bottom: 1px solid grey"><a href="./genre.html?id=${genre.id}&name=${genre.name}">${genre.name}</a></div>`;
        })
        genresContainer.appendChild(genresEl);
      }
    }
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
      castPhotosContainer.innerHTML = "<h2>Main Roles</h2>";
      const castEl = document.createElement('div');
      const wholeCast = document.createElement('div');
      wholeCast.classList.add('whole-cast');
      wholeCast.innerHTML = "Rest of the Cast<br>";
      if(movieWithId.cast.length === 3){
        wholeCast.style.display = "none";
      }
      castEl.classList.add('cast-photos')

      movieWithId.cast.forEach((actor,index) => {
        if(index >= 3){
          if(index !== movieWithId.cast.length - 1){
            wholeCast.innerHTML +=`<a href="./actor.html?id=${actor.id}">${actor.name + ', '}</a>`;
          }
          else{
            wholeCast.innerHTML +=`<a href="./actor.html?id=${actor.id}">${actor.name}</a>`;
          }
        }
        else{
          castContainer.innerHTML +=  
          `
            ${index < 2 ? actor.name + ', ' : actor.name} 
            `
          castEl.innerHTML +=
          `
          <div style="position:relative">
            <a href="./actor.html?id=${actor.id}" >
              <img src="${actor.profile_path ? 'https://image.tmdb.org/t/p/original' + actor.profile_path : "images/photo-unavailable.png"}" alt="photo" class="img" >
              <div class="actor-name">
                <p>${actor.name}</p>
              </div>
            </a>
          </div>
          `
          castPhotosContainer.appendChild(castEl);
        }
        castPhotosContainer.appendChild(wholeCast);
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