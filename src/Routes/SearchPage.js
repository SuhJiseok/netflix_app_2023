import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "../styles/Searchpage.css";
import useDebounce from 'hooks/useDebounce';


function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const useQuery = () =>{
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();

  const searchTerm = query.get("q");
  const debounceSearchTerm = useDebounce(searchTerm, 500);
  console.log('searchTerm->',searchTerm);

  useEffect(() => {
    if(debounceSearchTerm){
      fetchSearchMovie(debounceSearchTerm);
    }
  },[debounceSearchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try{
      //https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
      const request = await axios.get(`/search/movie?include_adult=false&query=${debounceSearchTerm}`);
      setSearchResults(request.data.results)

    } catch (error) {
      console.log("error",error)
    }
  }
  const renderSearcchResults = () =>{
    return searchResults.length > 0 ? (
      <section className='search-container'>
        {searchResults.map(movie => {
          if(movie.backdrop_path !== null && movie.media_type !== "person"){
            const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
                return(
                  <div className='movie' key={movie.id}>
                    <div className='movie__column-poster' onClick={()=> navigate(`/${movie.id}`)}>
                      <img src={movieImageUrl} alt={movie.title} className='movie__poster' />
                    </div>
                  </div>
                )
          }
        })}
      </section>

    ) : (
      <section className="no-results">
        <div className="no-resulte__text">
          <p>
            찾고자하는 검색어 "{searchTerm}" 에 맞는 영화가 없습니다.
          </p>
        </div>
      </section>
            
    );
  }
  return renderSearcchResults();
}

export default SearchPage