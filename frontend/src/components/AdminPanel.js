import React, { useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [title, setTitle] = useState('');
  const [seatsAvailable, setSeatsAvailable] = useState(100);

  const handleAdd = () => {
    axios.post('http://localhost:5000/api/movies', { title, seatsAvailable })
      .then(() => alert('Movie added!'))
      .catch(() => alert('Failed to add movie'));
  };

  return (
    <div>
      <h2>Add Movie (Admin)</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Movie title" />
      <input type="number" value={seatsAvailable} onChange={e => setSeatsAvailable(Number(e.target.value))} placeholder="Seats" min="1" />
      <button onClick={handleAdd}>Add Movie</button>
    </div>
  );
};

export default AdminPanel;