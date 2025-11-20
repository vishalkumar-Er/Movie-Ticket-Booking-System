import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Booking = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [seats, setSeats] = useState(1);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/api/movies')
      .then(res => {
        const selectedMovie = res.data.find(m => m._id === id);
        setMovie(selectedMovie);
        setLoading(false);
      })
      .catch(() => {
        setMsg('Could not fetch movie details!');
        setLoading(false);
      });
  }, [id]);

  const bookSeats = () => {
    if (!movie) return;
    if (seats < 1 || seats > movie.seatsAvailable) {
      setMsg(`Please select seats between 1 and ${movie.seatsAvailable}`);
      return;
    }
    setMsg('');
    const userId = 'demo-user';
    axios.post('http://localhost:5000/api/bookings', {
      userId,
      movieId: id,
      seatsBooked: seats
    })
      .then(() => {
        setMsg('Booking Confirmed!');
        alert('Booking Confirmed!'); // Pop-up on success
      })
      .catch(err => {
        const errMsg = err?.response?.data?.message || 'Booking Failed!';
        setMsg(errMsg);
        alert(errMsg); // Pop-up on failure
      });
  };

  if (loading) return <div>Loading Movie...</div>;
  if (!movie) return <div style={{color:"red"}}>Movie not found!</div>;

  return (
    <div>
      <h2>Booking for: {movie.title}</h2>
      <p>Theater: {movie.theater}</p>
      <p>Showtimes: {movie.showtimes.join(', ')}</p>
      <p>Description: {movie.description}</p>
      <p>Seats Available: {movie.seatsAvailable}</p>

      <label>
        Seats to Book:&nbsp;
        <input
          type="number"
          min="1"
          max={movie.seatsAvailable}
          value={seats}
          onChange={e => setSeats(Number(e.target.value))}
        />
      </label>
      <button style={{marginLeft:'15px'}} onClick={bookSeats}>Book Now</button>
      <div style={{color: msg === 'Booking Confirmed!' ? 'green' : 'red', marginTop:'8px'}}>{msg}</div>
    </div>
  );
};

export default Booking;