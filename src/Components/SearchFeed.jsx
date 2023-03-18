import { useEffect, useState } from "react";
import defaultBG from './images/defaultBG.jpg'
import loadGif from './images/LoadingGif.gif';
import NewsItem from "./NewsItem";


const SearchFeed = ({url, page, setPage}) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch(url + `&page=${page}`).then((response) => {
            if (response.ok) {
                return response.json();
            }
            alert('Something went wrong... To many requests made. Plz reload');
        }).then((responseJson) => {
            setArticles(responseJson.articles);
            setLoading(false);
            setTotalResults((responseJson.totalResults < 100) ? responseJson.totalResults : 100);
            if(page === 1 ){
                document.querySelector('.previousNextContainer i.previous').style.visibility = "hidden";
                document.querySelector('.previousNextContainer i.next').style.visibility = "visible";
            }
        })

    }, [url, page]);

    const prevClicked = () => {
        if (page - 1 < Math.ceil(totalResults / 20)) {
            document.querySelector('.previousNextContainer i.next').style.visibility = "visible";
        }
        if (page - 1 < 2) {
            document.querySelector('.previousNextContainer i.previous').style.visibility = "hidden";
        }
        setPage(page - 1);
    }

    const nextClicked = () => {
        if (page + 1 >= 1) {
            document.querySelector('.previousNextContainer i.previous').style.visibility = "visible";
        }
        if (page + 1 === Math.ceil(totalResults / 20)) {
            document.querySelector('.previousNextContainer i.next').style.visibility = "hidden";
        }
        setPage(page + 1);
    }
    return (
        <>
            

            <div className='newsContainer'>
                {
                    !loading && articles !== undefined &&
                    articles.map((element) => {
                        return (
                            <NewsItem key={element.url}
                                title={(element.title) ? element.title.slice(0, 55) : ""}
                                description={(element.description) ? element.description : ""}
                                // removed slice from description
                                imageUrl={(element.urlToImage) ? element.urlToImage : defaultBG}
                                newsUrl={element.url}
                                publishedAt={element.publishedAt}
                            />
                        )
                    })
                }
                {
                    !loading &&
                    articles !== undefined &&
                    articles.length === 0 &&

                    <h1>
                        no news to display
                    </h1>
                }
            </div>
            {
                <div className="previousNextContainer">
                    <i className="previous round" onClick={prevClicked}>&larr;</i>
                    {loading && <img src={loadGif} alt='Loading...' />}
                    <i className="next round" onClick={nextClicked}>&rarr;</i>
                </div>
            }
        </>
    )
}
export default SearchFeed;