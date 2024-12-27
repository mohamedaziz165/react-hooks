// MovieCard.js
import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.posterURL} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <p>Note : {movie.rating}</p>
    </div>
  );
};

export default MovieCard;

// Filtre.js
import React from 'react';

const Filtre = ({ onTitleFilter, onRatingFilter }) => {
  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Filtrer par titre"
        onChange={(e) => onTitleFilter(e.target.value)}
      />
      <input
        type="number"
        placeholder="Filtrer par note"
        min="0"
        max="10"
        onChange={(e) => onRatingFilter(Number(e.target.value))}
      />
    </div>
  );
};

export default Filtre;

// MovieList.js
import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;

// App.js
import React, { useState } from 'react';
import MovieList from './MovieList';
import Filtre from './Filtre';

const App = () => {
  const [movies, setMovies] = useState([
    {
      title: "Dragon ball z",
      description: "Un guerrier de l'espace qui veut etre fort",
      posterURL: "https://link-to-poster.jpg",
      rating: 10
    },
    {
      title: "Titanic",
      description: "Un amour tragique à bord du Titanic.",
      posterURL: "https://link-to-poster.jpg",
      rating: 10
    }
  ]);

  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    posterURL: "",
    rating: ""
  });

  const handleTitleFilter = (title) => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(title.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleRatingFilter = (rating) => {
    const filtered = movies.filter((movie) => movie.rating >= rating);
    setFilteredMovies(filtered);
  };

  const handleAddMovie = () => {
    setMovies([...movies, newMovie]);
    setFilteredMovies([...movies, newMovie]);
    setNewMovie({ title: "", description: "", posterURL: "", rating: "" });
  };

  return (
    <div className="App">
      <h1>Ma Liste de Films</h1>

      <Filtre
        onTitleFilter={handleTitleFilter}
        onRatingFilter={handleRatingFilter}
      />

      <div>
        <h2>Ajouter un nouveau film</h2>
        <input
          type="text"
          placeholder="Titre"
          value={newMovie.title}
          onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newMovie.description}
          onChange={(e) =>
            setNewMovie({ ...newMovie, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="URL Poster"
          value={newMovie.posterURL}
          onChange={(e) =>
            setNewMovie({ ...newMovie, posterURL: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Note"
          value={newMovie.rating}
          onChange={(e) =>
            setNewMovie({ ...newMovie, rating: Number(e.target.value) })
          }
        />
        <button onClick={handleAddMovie}>Ajouter le film</button>
      </div>

      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default App;
