
import axios from 'api/axios';
import useOnClickOutside from 'hooks/useOnClickOutside';
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import "styles/moviemodal.css"
import { FaPlayCircle } from "react-icons/fa";

function MovieModal({setModalOpen,backdrop_path,overview,release_date,title,vote_average,name,first_air_date, movieId}) {
  console.log('MovieModal props:', {
    setModalOpen,
    backdrop_path,
    overview,
    release_date,
    title,
    vote_average,
    name,
    first_air_date,
    movieId,
  });
  const ref = useRef();
  const [isClicked, setIsClicked] = useState(false);
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchData(movieId);
  }, [movieId]);

  const fetchData = async (id) => {
    const { data: movieDetail } = await axios.get(`/movie/${id}`, {
      params: { append_to_response: "videos" }
    });

    setMovie(movieDetail);
  };

  const trailerId = movie?.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  )?.key;
  


  useOnClickOutside(ref, ()=>{setModalOpen(false)});


  return (
    <div className='presentation'>
      <div className='wrapper-modal'>
        <div className='modal' ref={ref}>
          <span className='modal-close' onClick={() => setModalOpen(false)}>X</span>
          <img className="modal__poster-img" alt={title ? title : name} src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}></img>
          <span className='playbtn' onClick={()=> setIsClicked(true)}>
            <i><FaPlayCircle /></i>
          </span>
          {isClicked && (
            <Iframe
              width="640"
              height="auto"
              src={`https://www.youtube.com/embed/${trailerId}?controls=0&autoplay=1&loop=1&mute=1&playlist=${trailerId}`}
              frameborder="0"
              allow="autoplay; fullscreen"
            ></Iframe>
          )}
          <div className='<modal__content'>
            <p className='modal__details'>
              <span className='modal__user_perc'>100% for you</span> {"  "}
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className='modal__title'>{title ? title : name}</h2>
            <p className='modal__details'>평점: {vote_average} </p>
            <p className='modal__overview'>{overview}</p>
          </div>
        </div>
      </div>
    </div>
  )}



const Iframe = styled.iframe`
  width: 100%;
  height: 460px;
  z-index: 1;
  opacity: 1;
  position: relative;
  border: 1px solid black;
  bottom: 620px;
  margin-bottom: -500px;



`;

export default MovieModal