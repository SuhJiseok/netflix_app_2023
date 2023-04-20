import DetailPage from "Routes/DetailPage";
import MainPage from "Routes/MainPage";
import SearchPage from "Routes/SearchPage";

import Footer from "component/Footer";
import MovieModal from "component/MovieModal";
import Nav from "component/Nav";

import { Outlet, Route, Routes } from "react-router-dom";
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
  return (
   <div className="app">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage/>} />
        <Route path=":movieId" element={<MovieModal/>} /> 
        <Route path="search" element={<SearchPage />} />
      </Route>
    </Routes>

   </div>
  );
}

export default App;
