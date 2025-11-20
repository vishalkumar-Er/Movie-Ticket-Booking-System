import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')
      .then(res => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Movies data not found! Backend chal raha hai?');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;
  if (!movies.length) return <div>No movies found.</div>;

  return (
    <div className='movie'>
      <h2>Movies Name</h2>
      <ul className="movies-list">
        {movies.map(m => (
          <li key={m._id}>
            <Link className="movie-link" to={`/booking/${m._id}`}>
              {m.title}
            </Link>
            <span className="seats">- Seats Available: {m.seatsAvailable}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MovieList;








