let language = "en-US";
let appendToResponse = "";

const headers = {
  accept: 'application/json',
  'content-type': 'application/json',
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

async function fetchData(url, options, errMsg){
  try{
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(errMsg);
    }
    const moviesData = await response.json();
    return moviesData;
  }
  catch (error) {
    if(error.message == "Unknown Movie ID"){
      return new Error("This movie is probably new so we haven't got its data yet :(");
    }
    console.error(error);
    return null;
  }
}

export const fetchMovies = async () => {
  setPreferences();
  const url = `https://api.themoviedb.org/3/trending/all/day?language=${language}`;
  const errorMessage = 'Failed to fetch movies';
  const response = await fetchData(url, optionsGet, errorMessage);
  return response;
};

export const fetchActors = async () =>{
  setPreferences();
  const url = `https://api.themoviedb.org/3/trending/person/day?language=${language}`;
  const errorMessage = "Failed to fetch actors/people";
  const response = await fetchData(url, optionsGet, errorMessage);
  return response;
}

export const getMovieById = async (id) =>{
  setPreferences();
  const url = `https://api.themoviedb.org/3/movie/${id}?language=${language}&append_to_response=${appendToResponse}`;
  const errorMessage = "Unknown Movie ID";
  const response = await fetchData(url, optionsGet, errorMessage);
  return response; 
}

export const getCastInfo = async (id) => {
  setPreferences();
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=${language}`;
  const errorMessage = "Failed to get whole cast";
  const response = await fetchData(url, optionsGet, errorMessage);
  return response;
}

export const getMoviesByActor = async (id) => {
  setPreferences();
  const url = `https://api.themoviedb.org/3/discover/movie?with_people=${id}&language=${language}`;
  const errorMessage = "Failed to get movies by actor";
  const response = await fetchData(url, optionsGet, errorMessage);
  return response;
}

export const getMoviesByGenre = async (id, page, filters) => {
  setPreferences();
  if(filters?.release){
    filters.release[0] = parseFloat(filters.release[0]) + "-01-01";
    filters.release[1] = parseFloat(filters.release[1]) + "-12-31";
  }
  const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&page=${page}&vote_average.gte=${filters?.vote[0] || 1}&vote_average.lte=${filters?.vote[1] || 10}&with_runtime.gte=${filters?.runtime[0] || 1}&with_runtime.lte=${filters?.runtime[1] || 200}&release_date.gte=${filters?.release[0] || 1874}&release_date.lte=${filters?.release[1] || new Date().getFullYear()}&language=${filters?.language || language}&sort_by=${filters?.sortBy || "vote_average.desc"}&vote_count.gte=500`;
  const errorMessage = "Failed to fetch movies for this genre";
  const response = await fetchData(url, optionsGet, errorMessage);
  return response;
}

export const getActorInfo = async (id) =>{
  setPreferences();
  const url = `https://api.themoviedb.org/3/person/${id}?language=${language}`;
  const errorMessage = "Failed to get actors information";
  const response = await fetchData(url, optionsGet, errorMessage);
  return response;
}

export const startGuestSession = async() =>{
  const url = `https://api.themoviedb.org/3/authentication/guest_session/new?language=${language}`;
  const errorMessage = "Failed to start guest session";
  const response = await fetchData(url, optionsGet, errorMessage);
  return response;
}

export const addMovieRating = async(guestId, movieId, rating) =>{
  const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestId}`;
  const errorMessage = "Failed to add movie rating";
  const response = await fetch(
    url,
    {
      method: 'POST',
      headers,
      body: `{"value": ${rating}}`
    },
    errorMessage
  );
  return response;
}

export const getMyMovieRatings = async (guestId)=>{
  setPreferences();
  const url = `https://api.themoviedb.org/3/guest_session/${guestId}/rated/movies?language=${language}`;
  const errorMessage = "Failed to get user movie ratings";
  const response = await fetchData(url, optionsGet, errorMessage);
  return response;
}

export const deleteMovieRating = async (guestId, movieId)=>{
  const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestId}`;
  const errorMessage = "Failed to delete user rating";
  const response = await fetchData(url, optionsDelete, errorMessage);
  return response;
}

export const getGenresList = async() =>{
  setPreferences();
  const url = `https://api.themoviedb.org/3/genre/movie/list?language=${language}`;
  const errorMessage = "Failed to get genres";
  const response = await fetchData(url, optionsGet, errorMessage);
  return response;
}

export const getSearchMatches = async(query) =>{
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}`;
  const errorMessage = "Failed to get search matches";
  const response = await fetchData(url, optionsGet, errorMessage);
  return response;
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
