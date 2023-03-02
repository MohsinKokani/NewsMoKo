import React from "react";
import { Link } from "react-router-dom";
import { setQuery } from "./NewsContainer";
let openNav = () => document.getElementById("mySidenav").style.width = "250px";

let closeNav = () => document.getElementById("mySidenav").style.width = "0";
window.addEventListener('mouseup', function (e) {
    if (e.target !== document.querySelector("#mySidenav a")) {
        closeNav();
    }
});

const NavBar = (props) => {

    async function SearchValue(e) {
        if (e.keyCode === 13) {//on enter (13)
            setQuery(document.querySelector('#searchInput').value);
            document.getElementById("submitQuery").click();//routes.to /everything
            let searchInput = document.querySelector('#searchInput');
            props.setState({
                ...props.state,
                loading: true,
                url:`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${process.env.REACT_APP_API_KEY}&pageSize=20`,
            });
            searchInput.blur();//to disable keypad in mobile device
            fetch(`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${process.env.REACT_APP_API_KEY}&pageSize=50&page=1`).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                alert('Something went wrong... To many requests made. Plz reload');
            }).then((responseJson) => {
                props.setState({
                    articles: responseJson.articles,
                    totalResults: (responseJson.totalResults < 100) ? responseJson.totalResults : 100,
                    page:1,
                    loading: false,
                });
            });
        }
    }

    return (
        <div className="navbar">
            <Link id="showMsg" to="/msg" ></Link>
            <div id="mySidenav" className="sidenav">
                <div className="closebtn" onClick={closeNav}>&times;</div>
                <Link to="/general" onClick={closeNav}>general</Link>
                <Link to="/business" onClick={closeNav}>business</Link>
                <Link to="/entertainment" onClick={closeNav}>entertainment</Link>
                <Link to="/health" onClick={closeNav}>health</Link>
                <Link to="/science" onClick={closeNav}>science</Link>
                <Link to="/sports" onClick={closeNav}>sports</Link>
                <Link to="/technology" onClick={closeNav}>technology</Link>
            </div>
            <div className="iconsArea">
                <div onClick={openNav} style={{ paddingLeft: '18px' }}><i className="fa-solid fa-bars icon-item"></i></div>
                <div ><Link to="/"><i className="fa-solid fa-house icon-item"></i></Link></div>
                <div className="SearchContainer">
                    <input autoComplete="off" spellCheck="true" onKeyUp={SearchValue} id="searchInput" type="text" placeholder="Search..." />
                    <Link id="submitQuery" to="/everything"></Link>
                    {/* submitQuery is always hidden and only clicked by SearchValue() */}
                    <i className="search"></i>
                </div>
                <div><Link to="/history"><i className="fa-sharp fa-solid fa-clock-rotate-left icon-item"></i></Link></div>
            </div>
        </div>
    )
}
export default NavBar;