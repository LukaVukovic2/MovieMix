import { getMyMovieRatings, deleteMovieRating } from "../api/api-config.js";

const myRatingsContainer = document.querySelector('.my-rating-container');
const sessionId = localStorage.getItem("guestSessionId")

const getMyRatings = async ()=>{
  if(sessionId){
    const myRatings = await getMyMovieRatings(sessionId);
    if(myRatings?.total_results > 0){
      myRatingsContainer.innerHTML = "<h2>My Movie ratings</h2>";
      myRatings.results.forEach(ratedMovie => {
        const ratedMovieContainer = document.createElement('div');
        ratedMovieContainer.classList.add('rated-movie');
        ratedMovieContainer.innerHTML = `
          <div>
            <span class="rating-value">${ratedMovie.rating} <i class="fa-regular fa-star" style="color: #e50914;"></i></span>
            <a class="movie-title" href="movie.html?id=${ratedMovie.id}">${ratedMovie.title}</a>
          </div>
          <a class="btn"><i class="fa-solid fa-minus"></i></a>`;
        ratedMovieContainer.querySelector('.btn').addEventListener("click", (e) =>{
          e.preventDefault();
          deleteRating(ratedMovie.id)
        });
        myRatingsContainer.appendChild(ratedMovieContainer);
        myRatingsContainer.appendChild(document.createElement('hr'));
      });
    }
    else{
      myRatingsContainer.innerHTML = "<h2>You haven't rated movies so far!</h2>"
    }
  }
}
getMyRatings()


const deleteRating = async(movieId) =>{
  const response = await deleteMovieRating(sessionId, movieId);
  setTimeout(() => {
    getMyRatings();
    alert('Rating is deleted!');
  }, 1000);
  console.log(response);
}
