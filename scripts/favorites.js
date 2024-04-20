import { getFavoriteMovies } from "../api/api-config.js";

const favoritesContainer = document.querySelector('.favorites-container');
let favorites;


const getFavorites = async ()=>{
  const sessionId = localStorage.getItem("guestSessionId")
  if(sessionId){
    favorites = await getFavoriteMovies(sessionId);
    if(favorites.results.length > 0){
      favorites.results.forEach(favorite => {
        favoritesContainer.innerHTML += `
          <div class="favorite-movies">
            <p>${favorite.title}</p>
            <div>
              <a class="btn">
                <i class="fa-solid fa-minus"></i>
              </a>
            </div>
          </div><hr>`
      });
      console.log(favorites);
    }
  }
}

getFavorites()