import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function DetailPage() {
  const [movie, setMovie] =useState({});
  let {movieId} = useParams();
  console.log("movieId->",movieId);
  const navigate = useNavigate();


  const fetchData = async () => {
    try {
      const request = await axios.get(`/movie/${movieId}`);
      console.log(request.data); // 영화 정보를 출력합니다.
      setMovie(request.data);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(()=>{
    fetchData();
  },[movieId])

  const handleClose = () => {
    navigate(-1);
  }
  // https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
  if (!movie) return <div>...loading</div>;
  return (
    <section>

      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title }
      />
      <p>{movie.overview}</p>
      <p>Release date: {movie.release_date}</p>
      <p>Vote average: {movie.vote_average}</p>
    </section>
  );
}

export default DetailPage