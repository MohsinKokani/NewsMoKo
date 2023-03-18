import { Link, useNavigate } from "react-router-dom";

let openNav = () => document.getElementById("mySidenav").style.width = "250px";

let closeNav = () => document.getElementById("mySidenav").style.width = "0";
window.addEventListener('mouseup', function (e) {
    if (e.target !== document.querySelector("#mySidenav a")) {
        closeNav();
    }
});

let categories = [
    'general',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology'
]
const NavBar=({setUrl, setPage})=>{
    const Key=process.env.REACT_APP_API_KEY;
    const navigate =useNavigate();
    const SearchValue = (e) => {
        if (e.keyCode === 13) {
            setPage(1);
            setUrl(`https://newsapi.org/v2/everything?q=${e.target.value}&apiKey=${Key}&pageSize=20`);
            navigate('/search');
            e.target.blur();
        }
    }
    const selectCategory = (category) => {
        setPage(1);
        setUrl(`https://newsapi.org/v2/top-headlines?country=${"in"}&category=${category}&apiKey=${Key}`);
        closeNav();
    }
    return (
        <>
        <div className="navbar">
                <Link id="showMsg" to="/msg" ></Link>
                <div id="mySidenav" className="sidenav">
                    <div className="closebtn" onClick={closeNav}>&times;</div>
                    {
                        categories.map(element => {
                            return (
                                <Link to={`/search`} key={element} onClick={() => selectCategory(element)}>{element}</Link>
                            )
                        })
                    }
                </div>
                <div className="iconsArea">
                    <div onClick={openNav} style={{ paddingLeft: '18px' }}><i className="fa-solid fa-bars icon-item"></i></div>
                    <div ><Link to="/"><i className="fa-solid fa-house icon-item"></i></Link></div>
                    <div className="SearchContainer">
                        <input autoComplete="off" spellCheck="true" onKeyUp={SearchValue} id="searchInput" type="text" placeholder="Search..." />
                        <i className="search"></i>
                    </div>
                    <div><Link to="/history"><i className="fa-sharp fa-solid fa-clock-rotate-left icon-item"></i></Link></div>
                </div>
            </div>
        </>
    )
}
export default NavBar;