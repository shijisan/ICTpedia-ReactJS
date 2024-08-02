import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import WikiSearch from '../components/WikiSearch';
import Nav from '../components/Nav';

function WikiResults() {
  const { keyword } = useParams(); // Get the search keyword from URL
  const [results, setResults] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('https://en.wikipedia.org/w/api.php', {
          params: {
            action: 'query',
            list: 'search',
            srsearch: keyword,
            format: 'json',
            origin: '*', // Required for CORS
            srlimit: 5, // Limit to 5 results
          },
        });

        const searchResults = response.data.query.search;

        // Fetch the full content for each result to get the first paragraph
        const detailedResults = await Promise.all(
          searchResults.map(async (result) => {
            const pageResponse = await axios.get('https://en.wikipedia.org/w/api.php', {
              params: {
                action: 'query',
                prop: 'extracts',
                exintro: true,
                explaintext: true,
                pageids: result.pageid,
                format: 'json',
                origin: '*', // Required for CORS
              },
            });

            const page = pageResponse.data.query.pages[result.pageid];
            return {
              title: result.title,
              pageid: result.pageid,
              extract: page.extract,
            };
          })
        );

        setResults(detailedResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchResults();
  }, [keyword]);

  const handleExpand = (pageid) => {
    setExpanded((prevState) => ({
      ...prevState,
      [pageid]: !prevState[pageid],
    }));
  };

  return (
    <>
      <Nav />
      <div className="container mt-4">
        <div className="top d-flex align-items-center">
          <a className='btn btn-outline-primary py-3 px-4 me-3' href="/wiki-search">&#10094;</a>
          <WikiSearch />
        </div>

        <h6 className='ps-5 py-3'>Search Results for: {decodeURIComponent(keyword)}</h6>
        <ul className="list-unstyled">
          {results.length > 0 ? (
            results.map((result) => (
              <li className='card p-lg-3 my-3' key={result.pageid}>
                <a
                  href={`https://en.wikipedia.org/?curid=${result.pageid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {result.title}
                </a>
                <hr />
                <p
                  style={{
                    height: expanded[result.pageid] ? '100%' : '20vh',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleExpand(result.pageid)}
                >
                  {result.extract}
                </p>
              </li>
            ))
          ) : (
            <p>No results found</p>
          )}
        </ul>
      </div>
    </>
  );
}

export default WikiResults;
