import { fetchActors } from "../api/api-config.js";

let actorsData;
const actorsContainer = document.querySelector('.actors-container');

const displayActors = async () => {
  actorsData = await fetchActors();

  if (actorsData) {
    console.log(actorsData);
    actorsData.results.forEach((actor) => {
      const specificActor = document.createElement('div');
      specificActor.style.display = "inline-block";
      specificActor.classList.add('actor');
      if(actor.profile_path){
        specificActor.innerHTML += `<a href="./actor.html?id=${actor.id}"><img src="https://image.tmdb.org/t/p/original${actor.profile_path}" class="img" alt="Image"></a><br>`;
      }
      actorsContainer.appendChild(specificActor);
    });
  } else {
    console.log('Failed to fetch movies data');
  }
};

displayActors();