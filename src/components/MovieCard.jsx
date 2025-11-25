// src/components/MovieCard.jsx
function MovieCard({ movie, onClick }) {
  const { Title, Year, Type, Poster } = movie;
  const isPlaceholderPoster = Poster === "N/A";

  return (
    <article className="movie-card" onClick={onClick}>
      <div className="movie-card__poster-wrapper">
        {isPlaceholderPoster ? (
          <div className="movie-card__poster movie-card__poster--placeholder">
            <span>No image</span>
          </div>
        ) : (
          <img
            src={Poster}
            alt={Title}
            loading="lazy"
            className="movie-card__poster"
          />
        )}
      </div>

      <div className="movie-card__body">
        <h3 className="movie-card__title" title={Title}>
          {Title}
        </h3>
        <div className="movie-card__meta">
          <span className="movie-card__year">{Year}</span>
          <span className="movie-card__type">
            {Type.charAt(0).toUpperCase() + Type.slice(1)}
          </span>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;
