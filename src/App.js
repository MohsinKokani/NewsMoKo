
import React, { useState } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import Home from './Components/Home';
import SearchFeed from './Components/SearchFeed';
import History from './Components/History';
import SlideRoutes from 'react-slide-routes'
import NavBar from './Components/NavBar';
const App=()=> {
  const Key=process.env.REACT_APP_API_KEY;
  const [url, setUrl] = useState(`https://newsapi.org/v2/top-headlines?country=${"in"}&category=general&apiKey=${Key}`);
  
  const [page, setPage] = useState(1);
  return (
    <>
      <BrowserRouter>
      <NavBar setUrl={setUrl} setPage={setPage}/>
        <SlideRoutes>
          <Route path="/" element={<Home key="home" setPage={setPage} />}></Route>
          
          <Route path="/search" element={<SearchFeed url={url} page={page} setPage={setPage} />} />

          <Route path="/history" element={<History key="history"/>}></Route>
        </SlideRoutes>
      </BrowserRouter>
      
    </>
  )
}
export default App;





