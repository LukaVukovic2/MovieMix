const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmQyMmIzNDkzZDQ4MjRmOGJjZGI3ZTMzNDRhNjU5NiIsInN1YiI6IjY2MDgwMGJmYTg5NGQ2MDE3YzY1NjY2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E2fP-TzEtZoTGNR547cDZREHP-Qh-wu7yoiMzl27C2A'
  }
};

const fetchMovies = async () => {
  try {
    const response = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options);
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
    const response = await fetch('https://api.themoviedb.org/3/trending/person/day?language=en-US', options);
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
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=3fd22b3493d4824f8bcdb7e3344a6596`, options);
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

const getCastInfo = async (id) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=3fd22b3493d4824f8bcdb7e3344a6596`, options);
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
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=3fd22b3493d4824f8bcdb7e3344a6596&with_people=${id}`, options);
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

export { fetchMovies, fetchActors, getMovieById, getCastInfo, getMoviesByActor};
