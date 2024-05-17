import { getActorInfo, getMoviesByActor } from "../api/api-config.js";

const actorContainer = document.querySelector('.actor-container-root');
const actorData = document.querySelector('.actor-desc');
const actorImage = document.querySelector('.actor-image');
const movieWrapper = document.querySelector('.movie-wrapper');
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const getActorData = async ()=>{
  const actor = await getActorInfo(id);
  if(actor){
    document.title += " - " + actor.name;
    let bio = actor.biography.replace(/\n/g, "<br>");
    actorImage.setAttribute("src", actor.profile_path ? `https://image.tmdb.org/t/p/original${actor.profile_path}`: `images/photo-unavailable.png`);
    actorData.innerHTML += `
      <h2>${actor.name}</h2>${bio}
      <p>${actor.birthday ? getAge(actor.birthday, actor.deathday): "Age: unknown"}</p>
      <p>Birthday: ${actor.birthday ? new Date(actor.birthday).toLocaleDateString() : "unknown"}</p>
      <p class="${isDeceased(actor.deathday)}">Death: ${new Date(actor.deathday).toLocaleDateString()}</p>
      <p>Place of birth: ${actor.place_of_birth ? actor.place_of_birth : "unknown"}</p>
    `;
  }
  else{
    actorContainer.innerHTML += '<h2>Failed to load actors data</h2>';
  }
}

getActorData();

const getMovies = async (id) => {
  const loadingSpinner = document.querySelector(".loading-spinner");
  loadingSpinner.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
  const moviesByActor = await getMoviesByActor(id);

  loadingSpinner.innerHTML = "";
  if (moviesByActor) {
    moviesByActor.results.forEach((movie) => {
      const movieEl = document.createElement('div');
      movieEl.classList.add('swiper-slide');
      movieEl.innerHTML += `
        <a href="movie.html?id=${movie.id}">
          <img class="movie-img" src="${movie.backdrop_path ? "https://image.tmdb.org/t/p/original" + movie.backdrop_path : "images/movie-img-unavailable.png"}" loading="lazy" alt="">
          <h3>${movie.title}</h3>
        </a>
        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
      `;
      movieWrapper.appendChild(movieEl);
    });
  }
  else{
    movieWrapper.style.display = "none";
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