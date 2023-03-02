import React from "react";
import defaultBG from './images/defaultBG.jpg';
import NewsItem, { visitedArticles } from "./NewsItem";
const History = () => {
    return (<>
        <h2 className='newsContainer'>Recently Visited...</h2>
        <div className='newsContainer'>
            {
                visitedArticles !== undefined &&
                visitedArticles.map((element) => {
                    return (<NewsItem key={element.newsUrl}
                        title={(element.title) ? element.title.slice(0, 55) : ""}
                        description={(element.description) ? element.description.slice(0, 215) + '...' : ""}
                        imageUrl={(element.imageUrl) ? element.imageUrl : defaultBG}
                        newsUrl={element.newsUrl}
                        publishedAt={element.publishedAt} />)
                })
            }
            {
                visitedArticles !== undefined &&
                visitedArticles.length === 0 &&

                <h1>
                    no news in history
                </h1>

            }
        </div>
    </>
    )
}
export default History;