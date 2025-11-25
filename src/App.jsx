// src/App.jsx
import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import MovieGrid from "./components/MovieGrid.jsx";
import MovieDetailsModal from "./components/MovieDetailsModal.jsx";
import Pagination from "./components/Pagination.jsx";
import { searchMovies, getMovieById } from "./services/omdbApi.js";
import useDebounce from "./hooks/useDebounce.js";

function App() {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("movie"); // movie, series, episode, all
  const [page, setPage] = useState(1);

  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  // Fetch list
  useEffect(() => {
    const fetchMovies = async () => {
      if (!debouncedQuery || debouncedQuery.trim().length < 2) {
        setMovies([]);
        setTotalResults(0);
        setError("");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const { Search, totalResults, Error: apiError } = await searchMovies(
          debouncedQuery.trim(),
          page,
          year.trim(),
          type === "all" ? undefined : type
        );

        if (apiError) {
          setMovies([]);
          setTotalResults(0);
          setError(apiError);
        } else {
          setMovies(Search || []);
          setTotalResults(Number(totalResults) || 0);
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching movies.");
        setMovies([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedQuery, page, year, type]);

  // Fetch details
  useEffect(() => {
    const fetchDetails = async () => {
      if (!selectedId) {
        setSelectedMovie(null);
        return;
      }

      setDetailsLoading(true);
      try {
        const data = await getMovieById(selectedId);
        setSelectedMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setDetailsLoading(false);
      }
    };

    fetchDetails();
  }, [selectedId]);

  const handleSearchSubmit = ({ query: newQuery, year: newYear, type: newType }) => {
    setQuery(newQuery);
    setYear(newYear);
    setType(newType);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.ceil(totalResults / 10) || 0;

  return (
    <div className="app-root">
      <Header />

      <main className="app-main">
        <section className="app-panel">
          <SearchBar
            query={query}
            year={year}
            type={type}
            onSearch={handleSearchSubmit}
          />

          <div className="status-bar">
            {loading && <span className="status-badge">Loading results...</span>}
            {!loading && totalResults > 0 && (
              <span className="status-badge">
                Showing page {page} of {totalPages} • {totalResults} results
              </span>
            )}
            {error && <span className="status-badge status-badge--error">{error}</span>}
          </div>

          <MovieGrid
            movies={movies}
            loading={loading}
            onSelectMovie={setSelectedId}
          />

          {!loading && !error && movies.length === 0 && debouncedQuery.trim().length >= 2 && (
            <div className="empty-state">
              <h2>No results found</h2>
              <p>Try a different title, year, or type.</p>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </section>
      </main>

      <footer className="app-footer">
        <span>Movie Library using OMDb API • Built with React</span>
      </footer>

      <MovieDetailsModal
        isOpen={!!selectedId}
        loading={detailsLoading}
        movie={selectedMovie}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}

export default App;
