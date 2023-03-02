import React, { Component } from "react";
import NewsItem from './NewsItem';
import PropTypes from "prop-types";
import loadGif from './images/LoadingGif.gif';
import defaultBG from './images/defaultBG.jpg';
let query = "";
export function getQuery() {
    return query;
}
export function setQuery(newQuery) {
    query = newQuery;
}
class NewsContainer extends Component {
    static defaultProps = {
        country: "in",
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.API_KEY=process.env.REACT_APP_API_KEY;
        document.title = `NewsMoKo - ${this.props.category}`
    }

    fetchNews = async (n) => {
        fetch(this.url + `&page=${n}`).then((response) => {
            if (response.ok) {
                return response.json();
            }
            alert('Something went wrong... To many requests made. Plz reload');
        }).then((responseJson) => {
            // Do something with the response
            this.props.setState({
                articles: responseJson.articles,
                loading: false,
                page: n,
                totalResults: (responseJson.totalResults < 100) ? responseJson.totalResults : 100,
            });
        })
    }
    componentDidMount = () => {
        if (this.props.category === "everything") {
            this.url = `https://newsapi.org/v2/everything?q=${getQuery()}&apiKey=${this.API_KEY}&pageSize=20`;
            return;
        }
        else {
            this.url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.API_KEY}`;
        }
        this.props.setState({
            ...this.props.state,
            loading: true
        });
        this.fetchNews(1);
    }

    prevClicked = () => {
        this.props.setState({
            ...this.props.state,
            loading: true
        });
        if (this.props.state.page - 1 < Math.ceil(this.props.state.totalResults / 20)) {
            document.querySelector('.previousNextContainer i.next').style.visibility = "visible";
        }
        if (this.props.state.page - 1 < 2) {
            document.querySelector('.previousNextContainer i.previous').style.visibility = "hidden";
        }
        this.fetchNews(this.props.state.page - 1);
    }
    nextClicked = () => {
        this.props.setState({
            ...this.props.state,
            loading: true,
        });

        if (this.props.state.page + 1 >= 1) {
            document.querySelector('.previousNextContainer i.previous').style.visibility = "visible";
        }
        if (this.props.state.page + 1 === Math.ceil(this.props.state.totalResults / 20)) {
            document.querySelector('.previousNextContainer i.next').style.visibility = "hidden";
        }
        this.fetchNews(this.props.state.page + 1);
    }
    render() {
        return (
            <>
                <h2 className='newsContainer'>
                    {this.props.category === "everything" ? query : this.props.category}
                </h2>
                <div className='newsContainer'>
                    {
                        !this.props.state.loading && this.props.state.articles !== undefined &&
                        this.props.state.articles.map((element) => {
                            return (<NewsItem key={element.url}
                                title={(element.title) ? element.title.slice(0, 55) : ""}
                                description={(element.description) ? element.description : ""}
                                // removed slice from description
                                imageUrl={(element.urlToImage) ? element.urlToImage : defaultBG}
                                newsUrl={element.url}
                                publishedAt={element.publishedAt} />)
                        })
                    }
                    {
                        !this.props.state.loading &&
                        this.props.state.articles !== undefined &&
                        this.props.state.articles.length === 0 &&

                        <h1>
                            no news to display
                        </h1>

                    }
                </div>
                {
                    this.props.category !== "everything" &&
                    <div className="previousNextContainer">
                        <i className="previous round" onClick={this.prevClicked}>&larr;</i>
                        {this.props.state.loading && <img src={loadGif} alt={loadGif} />}
                        <i className="next round" onClick={this.nextClicked}>&rarr;</i>
                    </div>
                }
            </>
        )
    }
}


export default NewsContainer;