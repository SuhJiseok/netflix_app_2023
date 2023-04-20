import axios from 'api/axios';
import React, { useEffect, useState } from 'react'
import "styles/Row.css";
import MovieModal from './MovieModal';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


function Row({isLargeRow, title, id, fetchUrl}) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState([]);
  

  useEffect(() => {
    fetchMovieData();
  },[fetchUrl]); //fetchUrl이 바뀔때마다 useEffect가 실행이 되야지

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    console.log(request)
    setMovies(request.data.results);
  }

  const handleClick = (movie) => {

    setModalOpen(true);
    setMovieSelected({ ...movie, id: movie.id });
  };
  return (
    <section className='row' key={id}>
      <h2>{title}</h2>
      <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation //arrow 버튼 사용 유무
      pagination={{ clickable: true }} //페이지 버튼 보이게 할지
      loop={true}
      breakpoints={{
        1378:{
        slidesPerView : 6,
        slidesPerGroup: 6
       },998:{
        slidesPerView : 5,
        slidesPerGroup: 5
       },625:{
      slidesPerView : 4,
      slidesPerGroup: 4
      },0:{
      slidesPerView : 3,
      slidesPerGroup: 3
    }}}

      >
        <div id={id} className='row__posters'>
          {movies.map((movie) => (
            <SwiperSlide>
              <div className='row__posterContainer'>
                <img
                  key={movie.id}
                  onClick={() => handleClick(movie)}
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                  loading='lazy'
                  alt={movie.title || movie.name || movie.original_name}
                />
                <div className='row__posterInfo'>
                  <h3>{movie.title || movie.name || movie.original_name}</h3>
                  <p>개봉일: {movie.release_date ? movie.release_date : movie.first_air_date}</p>
                  <p>평점: {movie.vote_average}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
      {modalOpen && (
        <MovieModal {...movieSelected}  setModalOpen={setModalOpen}  movieId={movieSelected.id} />
      )}
    </section>
  )
}
export default Row