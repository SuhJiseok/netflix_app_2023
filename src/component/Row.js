import axios from 'api/axios';
import React, { useEffect, useState } from 'react'
import "styles/Row.css";
import MovieModal from './MovieModal';

import { genreListURL } from 'api/requests';
import { FaStarHalf, FaStar } from "react-icons/fa";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const roundHalfStar = (rating) => {
  const normalizedRating = (rating / 10) * 5; // 10점 만점에서 5점 만점으로 변환
  const rounded = Math.round(normalizedRating * 2) / 2;
  const stars = [];
  for (let i = 0; i < Math.floor(rounded); i++) {
    stars.push(<FaStar />);
  }
  if (rounded % 1 === 0.5) {
    stars.push(<FaStarHalf/>);
  }
  // 숫자로 표시된 평점과 최대 점수 추가
  stars.push(<span> {rounded}/5</span>);
  return stars;
};





function Row({isLargeRow, title, id, fetchUrl}) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState([]);
  const [genres, setGenres] = useState([]);


  useEffect(() => {
    fetchMovieData();
    fetchGenres();
  },[fetchUrl]); //fetchUrl이 바뀔때마다 useEffect가 실행이 되야지





  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    console.log(request)
    setMovies(request.data.results);

  }

  const fetchGenres = async () => {
    const request = await axios.get(genreListURL);
    setGenres(request.data.genres);
  };

  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .join(', ');
  };

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
                  <div className='rowtxtbox'>
                  <h3>{movie.title || movie.name || movie.original_name}</h3>
                  <p className='star'>{roundHalfStar(movie.vote_average)}</p>
                  <p className='genre'>{getGenreNames(movie.genre_ids)}</p>
                  <p>개봉일: {movie.release_date ? movie.release_date : movie.first_air_date}</p>
                  {title === "NETFLIX ORIGINALS" && (
                    <p className='overview'>줄거리: {movie.overview}</p>
                  )}
                  </div>
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