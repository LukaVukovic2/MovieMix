const optionsGet = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmQyMmIzNDkzZDQ4MjRmOGJjZGI3ZTMzNDRhNjU5NiIsInN1YiI6IjY2MDgwMGJmYTg5NGQ2MDE3YzY1NjY2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E2fP-TzEtZoTGNR547cDZREHP-Qh-wu7yoiMzl27C2A'
  }
};

const optionsDelete = {
  method: 'DELETE',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmQyMmIzNDkzZDQ4MjRmOGJjZGI3ZTMzNDRhNjU5NiIsInN1YiI6IjY2MDgwMGJmYTg5NGQ2MDE3YzY1NjY2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E2fP-TzEtZoTGNR547cDZREHP-Qh-wu7yoiMzl27C2A'
  }
}

const fetchMovies = async () => {
  try {
    const response = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', optionsGet);
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
    const response = await fetch('https://api.themoviedb.org/3/trending/person/day?language=en-US', optionsGet);
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
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=3fd22b3493d4824f8bcdb7e3344a6596`, optionsGet);
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
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=3fd22b3493d4824f8bcdb7e3344a6596`, optionsGet);
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
    const response = await fetch(`
      https://api.themoviedb.org/3/discover/movie?api_key=3fd22b3493d4824f8bcdb7e3344a6596&with_people=${id}`,
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
    let response = await fetch(`
      https://api.themoviedb.org/3/discover/movie?api_key=3fd22b3493d4824f8bcdb7e3344a6596&with_genres=${id}&page=${page}&sort_by=vote_average.desc&vote_count.gte=1000`,
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
    const response = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=3fd22b3493d4824f8bcdb7e3344a6596`, optionsGet);
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
    const response = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=3fd22b3493d4824f8bcdb7e3344a6596', optionsGet);
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

const getLists = async()=>{
  try{
    const response = await fetch('https://api.themoviedb.org/3/account/21156170/lists?page=1', optionsGet);
    if(!response.ok){
      throw new Error('Failed to get lists');
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
    console.log(rating)
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
  const response = await fetch(`https://api.themoviedb.org/3/guest_session/${guestId}/rated/movies`, optionsGet);
  const resData = await response.json();
  return resData;
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
    const response = await fetch("https://api.themoviedb.org/3/genre/movie/list", optionsGet);
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

export { fetchMovies, fetchActors, getMovieById, getCastInfo, getMoviesByActor, getMoviesByGenre, getActorInfo, startGuestSession, 
  addMovieRating, getMyMovieRatings, deleteMovieRating, getGenresList};
