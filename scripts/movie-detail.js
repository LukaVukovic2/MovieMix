import { getMovieById, getCastInfo, addMovieRating } from "../api/api-config.js"

const movieDetail = document.querySelector('.movie-detail');
const movieRootEl = document.querySelector('.movie-root')
const movieExtraDesc = document.querySelector('.movie-extra-desc');
const bgImageEl = document.querySelector('.bg-image');
const castContainer = document.querySelector('.cast-container');
const tagline = document.querySelector('.tagline');
const genresContainer = document.querySelector('.genres-container');
const castPhotosContainer = document.querySelector('.cast-photos-container');
const optionalContainer = document.querySelector('.optional-container');
const recommend = localStorage.getItem("recommend");

let movie;
let hours;
let mins;
let res;
let rating = 5;
let ratingValueEl;
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const sessionId = localStorage.getItem("guestSessionId");

const addRating = async () => {
  if (sessionId) {
    try {
      res = await addMovieRating(sessionId, id, rating);
      alert('Rating is added!');
      console.log(res);
    } catch (error) {
      console.error('Error adding rating:', error);
    }
  }
};



const getMovie = async (id) => {
  try {
    const loadingSpinner = document.querySelector(".loading-spinner");
    loadingSpinner.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
    movie = await getMovieById(id);
    loadingSpinner.innerHTML = "";
  
    createRatingElement();

    if (movie instanceof Error) {
      bgImageEl.innerHTML = movie.message;
      movieRootEl.innerHTML = "";
      throw new Error('Failed to get movie');
    } 
    
    if (movie) {
      document.title += ' - ' + movie.title;
      if(movie.backdrop_path){
        bgImageEl.classList.add('primary-photo');
        bgImageEl.style.background = `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`;
      }
      else{
        bgImageEl.classList.add('secondary-photo');
        bgImageEl.style.background = `url('https://image.tmdb.org/t/p/original${movie.poster_path}'`;
      }

      if(movie.tagline){
        tagline.innerHTML = `<i>${movie.tagline}</i><hr>`;
      }
      else{
        tagline.innerHTML = "<hr>";
      }
    
      movieDetail.innerHTML += 
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
          genresEl.innerHTML += `
            <div style="border-bottom: 1px solid grey">
              <a class="genre-info" href="./genre.html?id=${genre.id}&name=${genre.name}">${genre.name}</a>
            </div>
          `;
        })
        genresContainer.appendChild(genresEl);
      }
      if(recommend == "yes"){
        addOptionalElement(
          movie.similar.results.slice(0, 3), 
          movie.videos.results.slice(0, 2)
        );
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
      wholeCast.innerHTML = "Rest of the Cast<br><br>";
      if(movieWithId.cast.length === 3){
        wholeCast.style.display = "none";
      }
      castEl.classList.add('cast-photos')

      if(movieWithId.cast.length <= 3){
        wholeCast.innerHTML += "unknown";
      }

      movieWithId.cast.forEach((actor,index) => {
        if(index >= 3){
          if(index !== movieWithId.cast.length - 1){
            wholeCast.innerHTML +=`<a class="actor-link" href="./actor.html?id=${actor.id}">${actor.name + ', '}</a>`;
          }
          else{
            wholeCast.innerHTML +=`<a class="actor-link" href="./actor.html?id=${actor.id}">${actor.name}</a>`;
          }
        }
        else{
          const numberOfActors = movieWithId.cast.length > 3 ? 3 : movieWithId.cast.length;
          castContainer.innerHTML +=  `${index < numberOfActors - 1 ? actor.name + ', ' : actor.name}`;
          castEl.innerHTML +=
          `
            <div style="position:relative">
              <a href="./actor.html?id=${actor.id}" >
                <img src="${actor.profile_path ? 'https://image.tmdb.org/t/p/original' + actor.profile_path : "images/photo-unavailable.png"}" alt="photo" class="actor-img" >
                <div class="absolute-el-name absolute-full">
                  <p>${actor.name}</p>
                </div>
              </a>
            </div>
          `;
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
    return `${mins}m`;
  }
}

function showSelectedRating(e){
  e.preventDefault();
  rating = e.target.value;
  ratingValueEl.innerHTML = rating;
}

function createRatingElement(){
  const ratingInputEl = document.createElement('input');
  ratingInputEl.setAttribute("type", "range");
  ratingInputEl.setAttribute("min", "1");
  ratingInputEl.setAttribute("max", "10");
  ratingInputEl.setAttribute("step", "0.5");
  ratingInputEl.setAttribute("value", "5");
  ratingInputEl.addEventListener("input", showSelectedRating);

  const addRatingBtn = document.createElement('a');
  addRatingBtn.classList.add('btn-primary');
  addRatingBtn.innerHTML = `Add Your Rating <i class="fa-regular fa-plus"></i>`;
  addRatingBtn.addEventListener("click", ()=>{
    addRating();
  });
  ratingValueEl = document.createElement('span');
  const ratingIcon = document.createElement('span');
  ratingIcon.innerHTML = `<i class="fa-regular fa-star" style="color: #FFD43B;"></i>`;
  ratingValueEl.innerHTML = '5';
  
  const ratingContainer = document.createElement('div');
  ratingContainer.classList.add('rating-container', 'flex-center');
  ratingContainer.appendChild(ratingValueEl);
  ratingContainer.appendChild(ratingIcon);
  ratingContainer.appendChild(ratingInputEl);
  ratingContainer.appendChild(addRatingBtn);
  movieRootEl.insertBefore(ratingContainer, movieExtraDesc);
}

function addOptionalElement(similar, videos){
  const flexTrailersEl = document.createElement('div');
  if(videos.length > 0){
    optionalContainer.innerHTML = `<hr><h2>Trailers and teasers</h2>`;
    flexTrailersEl.classList.add('optional-flex-container', 'flex-space-between');
    videos.forEach(video =>{
      flexTrailersEl.innerHTML += 
      `
        <div class="optional-flex-item iframe-container">
          <iframe class="iframe absolute-full" width="100%" height="100%" src="https://www.youtube.com/embed/${video.key}" frameborder="0" allowfullscreen></iframe>
        </div>
      `;
    })
  }
  optionalContainer.appendChild(flexTrailersEl);
  
  const flexRecommendEl = document.createElement('div');
  if(similar.length > 0){
    optionalContainer.innerHTML += "<h2>You might also like...</h2>"
    flexRecommendEl.classList.add('optional-flex-container', 'flex-space-between');
    similar.forEach(recomMovie =>{
      flexRecommendEl.innerHTML += 
      `
        <div class="optional-flex-item">
          <a href="movie.html?id=${recomMovie.id}">
            <img src="${recomMovie.backdrop_path ? 'https://image.tmdb.org/t/p/original' + recomMovie.backdrop_path : "images/movie-img-unavailable.png"}" alt="photo" class="recommend-movie-img" >
            <div class="absolute-el-name absolute-full">
              <p>${recomMovie.title}</p>
            </div>
          </a>
        </div>
      `;
    })
  }
  optionalContainer.appendChild(flexRecommendEl);
}