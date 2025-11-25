// src/services/omdbApi.js
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

if (!API_KEY) {
  console.warn(
    "VITE_OMDB_API_KEY is not defined. Create a .env file in the project root."
  );
}

export async function searchMovies(query, page = 1, year = "", type) {
  const params = new URLSearchParams({
    apikey: API_KEY,
    s: query,
    page: String(page),
  });

  if (year) params.append("y", year);
  if (type) params.append("type", type); // movie, series, episode

  const res = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch movies.");
  }

  const data = await res.json();
  return data;
}

export async function getMovieById(id) {
  const params = new URLSearchParams({
    apikey: API_KEY,
    i: id,
    plot: "full",
  });

  const res = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch movie details.");
  }

  const data = await res.json();
  return data;
}
