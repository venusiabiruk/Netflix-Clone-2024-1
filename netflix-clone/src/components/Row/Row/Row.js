import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "../../../utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(fetchUrl);
        if (request.data.results.length === 0) {
          console.warn("No movies found for this category:", fetchUrl);
        }
        setMovies(request.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
        alert(
          "An error occurred while loading movies. Please try again later."
        );
      }
    })();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie.name || movie?.original_name)
        .then((url) => {
          if (url) {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get("v"));
          } else {
            alert("Trailer not found.");
          }
        })
        .catch((error) => console.error("Error fetching trailer:", error));
    }
  };

  const opts = {
    height: "300",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row_posters">
        {movies?.map((movie, index) => (
          <img
            key={index}
            onClick={() => handleClick(movie)}
            src={
              movie.poster_path || movie.backdrop_path
                ? `${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movie.name || "Movie"}
            aria-label={`Play trailer for ${movie.name || "this movie"}`}
            className={`row_poster ${isLargeRow ? "row_posterLarge" : ""}`}
          />
        ))}
      </div>
      {trailerUrl && (
        <div style={{ padding: "40px" }}>
          <YouTube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </div>
  );
};

export default Row;
