
import React,{useState} from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import NewsContainer from './Components/NewsContainer';
import History from './Components/History';
import SlideRoutes from 'react-slide-routes'
const App=()=> {
  const [state,setState]=useState({
    url:"",
    articles:[],
    loading:false,
    page: 1,
    totalResults: 0,
  })
  return (
    <>
      <BrowserRouter>
        <NavBar state={state} setState={setState} />
        <SlideRoutes>
          <Route path="/" element={<Home key="home" />}></Route>
          
          <Route path="/everything" element={<NewsContainer state={state} setState={setState} key="everything" country="in" category="everything" />}></Route>

          <Route path="/general" element={<NewsContainer state={state} setState={setState} key="general" country="in" category="general" />}></Route>

          <Route path="/business" element={<NewsContainer state={state} setState={setState} key="business" country="in" category="business" />}></Route>

          <Route path="/entertainment" element={<NewsContainer state={state} setState={setState} key="entertainment" country="in" category="entertainment" />}></Route>

          <Route path="/health" element={<NewsContainer state={state} setState={setState} key="health" country="in" category="health" />}></Route>

          <Route path="/science" element={<NewsContainer state={state} setState={setState} key="science" country="in" category="science" />}></Route>

          <Route path="/sports" element={<NewsContainer state={state} setState={setState} key="sports" country="in" category="sports" />}></Route>

          <Route path="/technology" element={<NewsContainer state={state} setState={setState} key="technology" country="in" category="technology" />}></Route>

          <Route path="/history" element={<History key="history"/>}></Route>
        </SlideRoutes>
      </BrowserRouter>
      
    </>
  )
}
export default App;





