import { getActorInfo, getMoviesByActor } from "../api/api-config.js";

const actorData = document.querySelector('.actor-desc');
const actorImage = document.querySelector('.actor-image');
const movieContainer = document.querySelector('.movie-wrapper');
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
let actor;
let movies;

const getActorData = async ()=>{
  actor = await getActorInfo(id);
  if(actor){
    let bio = actor.biography.replace(/\n/g, "<br>");
    actorImage.setAttribute("src", actor.profile_path ? `https://image.tmdb.org/t/p/original${actor.profile_path}`: `images/photo-unavailable.png`);
    actorData.innerHTML += `
      <h2>${actor.name}</h2>${bio}
      <p>${actor.birthday ? getAge(actor.birthday, actor.deathday): "Age: unknown"}</p>
      <p>Birthday: ${actor.birthday ? new Date(actor.birthday).toLocaleDateString() : "unknown"}</p>
      <p class="${isDeceased(actor.deathday)}">Death: ${new Date(actor.deathday).toLocaleDateString()}</p>
      <p>Placed of birth: ${actor.place_of_birth ? actor.place_of_birth : "unknown"}</p>
    `;
  }
  else{
    console.log('Failed to load actors data');
  }
}

getActorData();

const getMovies = async (id) => {
  try {
    movies = await getMoviesByActor(id);
    if (movies) {
      movies.results.forEach((movie) => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('swiper-slide');
        movieEl.innerHTML += `
          <a href="movie.html?id=${movie.id}">
            <img class="movie-img" src="${movie.backdrop_path ? "https://image.tmdb.org/t/p/original" + movie.backdrop_path : "images/movie-img-unavailable.png"}" alt="">
            <h3>${movie.title}</h3>
          </a>
        `;
        movieContainer.appendChild(movieEl);
      });
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
getMovies(id);

function getAge(birthday, deathday){
  let miliseconds;
  let label;
  if(isDeceased(deathday) === "dead"){
    miliseconds = Math.abs(new Date(deathday) - new Date(birthday));
    label = "Age of death: ";
  }
  else{
    miliseconds = Math.abs(new Date() - new Date(birthday));
    label = "Age: ";
  }
  const years = Math.floor(miliseconds / 31556952000);
  return label + years;
}

function isDeceased(deathday){
  if(deathday === null){
    return "alive";
  }
  else{
    return "dead";
  }
}

var swiper3 = new Swiper('.movie-container', {
  slidesPerView: 4.5,
  spaceBetween: 10,
  slidesPerGroup: 4,
  navigation: {
    nextEl: '#movies-next',
    prevEl: '#movies-prev',
  },
});