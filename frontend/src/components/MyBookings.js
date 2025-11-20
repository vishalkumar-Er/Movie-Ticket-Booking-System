import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const userId = 'demo-user'; // Ya actual user id, jab login lagaoge

  useEffect(() => {
    axios.get(`http://localhost:5000/api/bookings?userId=${userId}`)
      .then(res => setBookings(res.data))
      .catch(() => setBookings([]));
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.length === 0 && <p>No bookings found.</p>}
      <ul>
        {bookings.map(b => (
          <li key={b._id}>
            Movie: {b.movieTitle || b.movieId} | Seats: {b.seatsBooked} | Date: {new Date(b.bookingDate).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MyBookings;