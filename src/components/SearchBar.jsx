// src/components/SearchBar.jsx
import { useState } from "react";

function SearchBar({ query, year, type, onSearch }) {
  const [localQuery, setLocalQuery] = useState(query);
  const [localYear, setLocalYear] = useState(year);
  const [localType, setLocalType] = useState(type);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!localQuery.trim()) return;
    onSearch({
      query: localQuery,
      year: localYear,
      type: localType,
    });
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-bar__main">
        <div className="form-group">
          <label htmlFor="query">Title</label>
          <input
            id="query"
            type="text"
            placeholder="Search by movie or series title..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
          />
        </div>

        <div className="form-group form-group--small">
          <label htmlFor="year">Year</label>
          <input
            id="year"
            type="number"
            placeholder="e.g. 2012"
            value={localYear}
            onChange={(e) => setLocalYear(e.target.value)}
            min="1900"
            max="2099"
          />
        </div>

        <div className="form-group form-group--small">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            value={localType}
            onChange={(e) => setLocalType(e.target.value)}
          >
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
            <option value="all">Any</option>
          </select>
        </div>
      </div>

      <div className="search-bar__actions">
        <button type="submit" className="btn btn--primary">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
