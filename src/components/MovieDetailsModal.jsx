// src/components/MovieDetailsModal.jsx
function MovieDetailsModal({ isOpen, loading, movie, onClose }) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal">
        <div className="modal__header">
          <h2>Details</h2>
          <button className="btn btn--ghost" onClick={onClose}>
            ✕
          </button>
        </div>

        {loading && (
          <div className="modal__body">
            <p>Loading movie details...</p>
          </div>
        )}

        {!loading && movie && (
          <div className="modal__body modal__body--layout">
            <div className="modal__poster">
              {movie.Poster && movie.Poster !== "N/A" ? (
                <img src={movie.Poster} alt={movie.Title} />
              ) : (
                <div className="modal__poster--placeholder">No image</div>
              )}
            </div>

            <div className="modal__details">
              <h3>{movie.Title}</h3>
              <p className="modal__subtitle">
                {movie.Year} • {movie.Rated} • {movie.Runtime}
              </p>
              <p className="modal__meta">
                {movie.Genre} • {movie.Type?.toUpperCase()}
              </p>
              {movie.imdbRating && movie.imdbRating !== "N/A" && (
                <p className="modal__rating">
                  IMDb rating: <strong>{movie.imdbRating}</strong> / 10
                </p>
              )}
              {movie.Plot && movie.Plot !== "N/A" && (
                <p className="modal__plot">{movie.Plot}</p>
              )}

              <div className="modal__footer">
                {movie.Director && movie.Director !== "N/A" && (
                  <p>
                    <strong>Director:</strong> {movie.Director}
                  </p>
                )}
                {movie.Actors && movie.Actors !== "N/A" && (
                  <p>
                    <strong>Cast:</strong> {movie.Actors}
                  </p>
                )}
                {movie.Language && movie.Language !== "N/A" && (
                  <p>
                    <strong>Language:</strong> {movie.Language}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {!loading && !movie && (
          <div className="modal__body">
            <p>Unable to load details.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetailsModal;
