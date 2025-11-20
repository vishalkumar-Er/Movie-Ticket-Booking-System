import React from "react";
import MovieList from "./MovieList"; // Agar MovieList.js 'components' folder me hai

function Home() {
  return (
    <div>
      {/* <h2>Movies</h2> */}
      <MovieList />
    </div>
  );
}
export default Home;