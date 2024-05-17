import { fetchActors } from "../api/api-config.js";

const actorsContainer = document.querySelector('.actors-wrapper');

const displayActors = async () => {
  const actorsData = await fetchActors();
  if (actorsData) {
    actorsData.results.forEach((actor) => {
      if(actor.profile_path){
        const actorEl = document.createElement('div');
        actorEl.classList.add('swiper-slide');
        actorEl.innerHTML += 
        ` 
          <a href="./actor.html?id=${actor.id}">
            <img src="https://image.tmdb.org/t/p/original${actor.profile_path}" class="img" alt="Image" loading="lazy">
          </a>
          <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          <p>${actor.name}</p>
        `;
        actorsContainer.appendChild(actorEl);
      }
    });
  } else {
    console.log('Failed to fetch movies data');
  }
};

displayActors();

var swiper2 = new Swiper('.actors-container', {
  slidesPerView: 4.5,
  spaceBetween: 10,
  slidesPerGroup: 4,
  navigation: {
    nextEl: '#actors-next',
    prevEl: '#actors-prev',
  },
  breakpoints: {
    100: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      
    },
    550: {
      slidesPerView: 1.5,
      slidesPerGroup: 1,
      spaceBetween: 10
    },
    700: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 10
    },
    850: {
      slidesPerView: 2.5,
      slidesPerGroup: 2,
      spaceBetween: 10,
    },
    1150: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 10
    },
    1300: {
      slidesPerView: 3.5,
      slidesPerGroup: 3,
      spaceBetween: 10
    },
    1400: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 10
    }
  }
});