import { fetchActors } from "../api/api-config.js";

let actorsData;
const actorsContainer = document.querySelector('.actors-wrapper');

const displayActors = async () => {
  actorsData = await fetchActors();

  if (actorsData) {
    actorsData.results.forEach((actor) => {
      if(actor.profile_path){
        const actorEl = document.createElement('div');
        actorEl.classList.add('swiper-slide');
        actorEl.innerHTML += 
          ` <a href="./actor.html?id=${actor.id}">
              <img src="https://image.tmdb.org/t/p/original${actor.profile_path}" class="img" alt="Image">
            </a>
            <p>${actor.name}</p>`;
        actorsContainer.appendChild(actorEl);
      }
    });
  } else {
    console.log('Failed to fetch movies data');
  }
};

var swiper2 = new Swiper('.actors-container', {
  slidesPerView: 4.5,
  spaceBetween: 10,
  slidesPerGroup: 4,
  navigation: {
    nextEl: '#actors-next',
    prevEl: '#actors-prev',
  },
});

displayActors();