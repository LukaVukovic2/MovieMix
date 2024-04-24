let language = "en-US";
let appendToResponse = "";

const headers = {
  accept: 'application/json',
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmQyMmIzNDkzZDQ4MjRmOGJjZGI3ZTMzNDRhNjU5NiIsInN1YiI6IjY2MDgwMGJmYTg5NGQ2MDE3YzY1NjY2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E2fP-TzEtZoTGNR547cDZREHP-Qh-wu7yoiMzl27C2A'
}

const optionsGet = {
  method: 'GET',
  headers
};

const optionsDelete = {
  method: 'DELETE',
  headers
}

const fetchMovies = async () => {
  try {
    setPreferences();
    const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?language=${language}`, optionsGet);
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const moviesData = await response.json();
    return moviesData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const fetchActors = async () =>{
  try {
    setPreferences();
    const response = await fetch(`https://api.themoviedb.org/3/trending/person/day?language=${language}`, optionsGet);
    if(!response.ok){
      throw new Error('Failed to fetch actors');
    }
    const actorsData = await response.json();
    return actorsData;
  } catch (error){
    console.error(error);
    return null;
  }
}

const getMovieById = async (id) =>{
  try {
    setPreferences();
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=${language}&append_to_response=${appendToResponse}`, optionsGet);
    if (!response.ok) {
      throw new Error('Failed to get movie');
    }
    const movie = await response.json();
    return movie;
  } 
  catch (error) {
    console.error(error);
    return error;
  }
}

const getCastInfo = async (id) => {
  try {
    setPreferences();
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=${language}`, optionsGet);
    if (!response.ok) {
      throw new Error('Failed to get movie');
    }
    const movie = await response.json();
    return movie;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const getMoviesByActor = async (id) => {
  try {
    setPreferences();
    const response = await fetch(`
      https://api.themoviedb.org/3/discover/movie?with_people=${id}&language=${language}`,
      optionsGet
    );
    if (!response.ok) {
      throw new Error('Failed to get movie');
    }
    const movies = await response.json();
    return movies;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const getMoviesByGenre = async (id, page) => {
  try {
    setPreferences();
    let response = await fetch(`
      https://api.themoviedb.org/3/discover/movie?with_genres=${id}&page=${page}&sort_by=vote_average.desc&vote_count.gte=1000&language=${language}`,
      optionsGet
    );
    if (!response.ok){
      throw new Error('Failed to get movies by genre');
    }
    let moviesByGenre = await response.json();
    
    if(moviesByGenre.results.length < 20){
      response = await fetch(`
        https://api.themoviedb.org/3/discover/movie?api_key=3fd22b3493d4824f8bcdb7e3344a6596&with_genres=${id}&page=${page}&sort_by=vote_average.desc&vote_count.gte=10`,
        optionsGet
      );
      if (!response.ok){
        throw new Error('Failed to get movies by genre');
      }
      moviesByGenre = await response.json();
    }
    return moviesByGenre;
  } catch (error){
    console.error(error);
    return null;
  }
}

const getActorInfo = async (id) =>{
  try{
    setPreferences();
    const response = await fetch(`https://api.themoviedb.org/3/person/${id}?language=${language}`, optionsGet);
    if(!response.ok){
      throw new Error('Failed to get actors information');
    }
    const actorsInfo = await response.json();
    return actorsInfo;
  }
  catch(error){
    console.error(error);
    return null;
  }
}

const startGuestSession = async() =>{
  try{
    const response = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?language=${language}`, optionsGet);
    if(!response.ok){
      throw new Error('Failed to start session');
    }
    const resData = await response.json();
    return resData;
  }
  catch(error){
    console.error(error);
    return null;
  }
}

const addMovieRating = async(guestId, movieId, rating) =>{
  try{
    const response = await fetch(`
    https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestId}`,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmQyMmIzNDkzZDQ4MjRmOGJjZGI3ZTMzNDRhNjU5NiIsInN1YiI6IjY2MDgwMGJmYTg5NGQ2MDE3YzY1NjY2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E2fP-TzEtZoTGNR547cDZREHP-Qh-wu7yoiMzl27C2A'
      },
      body: `{"value": ${rating}}`
      }
    );
    if(!response.ok){
      throw new Error('Failed to add rating');
    }
    const resData = await response.json();
    return resData;
  }
  catch(error){
    console.error(error);
    return null;
  }
}

const getMyMovieRatings = async (guestId)=>{
  try{
    setPreferences();
    const response = await fetch(`https://api.themoviedb.org/3/guest_session/${guestId}/rated/movies?language=${language}`, optionsGet);
    if(!response.ok){
      throw new Error("Failed to get your ratings");
    }
    const resData = await response.json();
    return resData;
  }
  catch(error){
    console.error(error);
    return null;
  }
}

const deleteMovieRating = async (guestId, movieId)=>{
  try{
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestId}`, optionsDelete);
    if(!response.ok){
      throw new Error('Failed to delete rating');
    }
    const resData = await response.json();
    return resData;
  }
  catch(error){
    console.error(error);
    return null;
  }
}

const getGenresList = async() =>{
  try{
    setPreferences();
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=${language}`, optionsGet);
    if(!response.ok){
      throw new Error('Failed to get genres list');
    }
    const resData = await response.json();
    return resData;
  }
  catch(error){
    console.error(error);
    return null;
  }
}

const getSearchMatches = async(query) =>{
  try{
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, optionsGet);
    if(!response.ok){
      throw new Error("Failed to get matches");
    }
    const resData = await response.json();
    return resData;
  }
  catch(error){
    console.error(error);
    return null;
  }
}

function setPreferences(){
  const selectedLanguage = localStorage.getItem("language");
  const recommend = localStorage.getItem("recommend");
  if(selectedLanguage){
    language = selectedLanguage;
  }
  if(recommend == "yes"){
    appendToResponse = "similar,videos";
  }
}

export { fetchMovies, fetchActors, getMovieById, getCastInfo, getMoviesByActor, getMoviesByGenre, getActorInfo, startGuestSession, 
  addMovieRating, getMyMovieRatings, deleteMovieRating, getGenresList, getSearchMatches};
