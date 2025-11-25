// src/components/MovieGrid.jsx
import MovieCard from "./MovieCard.jsx";

function MovieGrid({ movies, loading, onSelectMovie }) {
  if (loading) {
    return (
      <div className="movie-grid movie-grid--loading">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="movie-card movie-card--skeleton" />
        ))}
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onClick={() => onSelectMovie(movie.imdbID)}
        />
      ))}
    </div>
  );
}

export default MovieGrid;
