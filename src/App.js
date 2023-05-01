import DetailPage from "Routes/DetailPage";
import React, { useEffect, useState } from 'react';
import MainPage from "Routes/MainPage";
import SearchPage from "Routes/SearchPage";

import Footer from "component/Footer";
import LoginForm from "component/LoginForm";
import MovieModal from "component/MovieModal";
import Nav from "component/Nav";

import { Outlet, Route, Routes } from "react-router-dom";
import { authService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";
import'styles/App.css';

const Layout = () =>{
  return(
    <div>
    <Nav />
    <Outlet /> 
    <Footer />
    </div>
  )
}
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);


  return (
   <div className="app">
    <Routes>
      {isLoggedIn ? (
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage/>} />
        <Route path=":movieId" element={<MovieModal/>} /> 
        <Route path="search" element={<SearchPage />} />
        <Route path="login" element={<LoginForm />} />
      </Route>
      ) : (
        <Route path="/" element={<LoginForm />} />
      )}
    </Routes>

   </div>
  );
}

export default App;
