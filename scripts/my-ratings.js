import { getMyMovieRatings } from "../api/api-config.js";

const myRatingsContainer = document.querySelector('.my-rating-container');
let myRatings;

const getMyRatings = async ()=>{
  const sessionId = localStorage.getItem("guestSessionId")
  if(sessionId){
    myRatings = await getMyMovieRatings(sessionId);
    if(myRatings.results.length > 0){
      myRatings.results.forEach(ratedMovie => {
        myRatingsContainer.innerHTML += `
          <div class="rated-movies">
            <div>
              <span class="rating-value">${ratedMovie.rating} <i class="fa-regular fa-star" style="color: #e50914;"></i> </span>
              <span>${ratedMovie.title}</span>
            </div>
            <div>
              <a class="btn">
                <i class="fa-solid fa-minus"></i>
              </a>
            </div>
          </div><hr>`
      });
      console.log(myRatings);
    }
  }
}

getMyRatings()