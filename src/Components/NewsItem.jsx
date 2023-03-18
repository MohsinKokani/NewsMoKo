import React from "react";
export var visitedArticles = JSON.parse(localStorage.getItem('visitedNews'));
if(visitedArticles===null) visitedArticles=[];
const NewsItem = ({ title, description, imageUrl, newsUrl, publishedAt }) => {
    const isUnique = (newsUurl) => {
        for (let idx = 0; idx < visitedArticles.length; idx++) {
            const element = visitedArticles[idx];
            if (newsUurl === element.newsUrl) {
                return false;
            }
        }
        return true;
    }
    const updateVisited = () => {
        if (isUnique(newsUrl)) {
            visitedArticles.push({
                title: title,
                description: description,
                imageUrl: imageUrl,
                newsUrl: newsUrl,
                publishedAt: publishedAt
            });
            localStorage.setItem('visitedNews',JSON.stringify(visitedArticles));
        }
    }
    return (
        <div className="news-card">
            <div className="news-card-bg" style={{ backgroundImage: `url(${imageUrl})` }}>
                <div className="news-card-text">
                    <h5 className="news-title">{title}<a onClick={updateVisited} href={newsUrl} target="_blank" rel="noreferrer">&nbsp;read_more</a>
                    </h5>
                    <p className="news-description">{description}</p>
                </div>
            </div>
            <p>{new Date(publishedAt).toGMTString()}</p>
        </div>
    )
}
export default NewsItem;