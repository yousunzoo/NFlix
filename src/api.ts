const API_KEY = "d60d1c320ed86fac0b82303d6b382da9";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}
interface ITV {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: [];
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

interface ISearch {
  id: number;
  backdrop_path: string;
  genre_ids: [];
  media_type: string;
  title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  first_air_date: string;
  name: string;
}
export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
export interface IGetTVsResult {
  page: number;
  results: ITV[];
  total_pages: number;
  total_results: number;
}

export interface IGetSearchResult {
  page: number;
  results: ISearch[];
  total_pages: number;
  total_results: number;
}
export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1`
  ).then((response) => response.json());
}

export function getTVs() {
  return fetch(
    `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko-KR&page=1`
  ).then((response) => response.json());
}

export function getPopMovies() {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`
  ).then((response) => response.json());
}

export function getUpcomingMovies() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1`
  ).then((response) => response.json());
}
export function getSearch(keyword: string | null) {
  return fetch(
    `${BASE_PATH}/search/multi?api_key=${API_KEY}&language=ko-KR&query=${keyword}&page=1&include_adult=false`
  ).then((response) => response.json());
}
