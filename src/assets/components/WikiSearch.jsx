import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Updated import

function WikiSearch() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate(); // Updated hook
  const location = useLocation(); // New hook for location

  const handleSearch = () => {
    if (!query) return; // Do nothing if query is empty

    // Check if the current address is /wiki-search
    if (location.pathname === '/wiki-search/') {
      return; // Stay on the same page
    }

    // Redirect to results page with the search query
    navigate(`/wiki-results/${encodeURIComponent(query)}`);
  };

  return (
    <>
      <div className="input-group flex-nowrap w-100">
        <input
          type="text"
          className="form-control p-3 w-100 rounded-start-4"
          placeholder="Search tech topics!"
          aria-describedby="search-button"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span
          className="input-group-text search-button btn btn-primary d-flex rounded-end-4 px-3"
          id="search-button"
          onClick={handleSearch}
        >
          Search
        </span>
      </div>
    </>
  );
}

export default WikiSearch;
