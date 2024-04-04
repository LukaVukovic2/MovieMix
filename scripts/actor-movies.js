import { getMoviesByActor } from "../api/api-config.js";

const urlParams = new URLSearchParams(window.location.search);
const id = await urlParams.get('id');

let movies;

const getMovies = async (id) => {
  try {
    movies = await getMoviesByActor(id);
    if (movies) {
      //treba dodat filmove tog glumca
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
getMovies(id);