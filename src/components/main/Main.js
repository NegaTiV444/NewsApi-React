import React, {Component} from 'react';
import NewsItem from './NewsItem';
import SourceButton from "./SourceButton";

const apiKey = '20faa20442224d72afd09408e8a8b1d4';

const defaultSource = '';
const defaultQuery = '';
const defaultCountry = 'us';

class Main extends Component {

    constructor(props) {
        super(props)

        this.state = {
            sources: [],
            news: [],
            currentSource: defaultSource,
            currentQuery: defaultQuery,
            currentCountry: defaultCountry,
            currentPage: 1,
            isEnd: false,
            isZero: false,
        }
        this.loadNews();
        this.loadSources();
        this.filterClick = this.filterClick.bind(this);
        this.loadMoreClick = this.loadMoreClick.bind(this);
        this.sourceClick = this.sourceClick.bind(this);
    }

    loadMoreClick() {
        this.setState({currentPage: this.state.currentPage + 1}, () => {
            this.loadNews();
        })
    }

    filterClick() {
        const filterInput = document.querySelector('#filter-input');
        this.setState({currentPage: 1, currentQuery: filterInput.value, currentSource: ''}, () => {
            this.loadNews()
        })
    }

    setNews(news) {
        let newsCount = this.state.currentPage * 5 - news.length;
        if (newsCount > 0 || news.length >= 40) {
            this.setState({isEnd: true});
            if (newsCount === this.state.currentPage * 5) {
                this.setState({isZero: true});
            } else
                this.setState({isZero: false});
        } else {
            this.setState({isEnd: false, isZero: false});
        }
        let loadedNews = [];
        news.forEach((item) => loadedNews.push(<NewsItem item={item}/>));
        this.setState({news: loadedNews});
        this.render();
    }

    setSources(sources) {
        let loadedSources = [];
        sources.forEach((item) => loadedSources.push(<SourceButton sourcesItem={item} id={item.id}
                                                                   onClickFunc={this.sourceClick}/>));
        this.setState({sources: loadedSources})
    }

    loadNews() {
        this.state.news = [];
        let currentNewsCounter = this.state.currentPage * 5;

        if (this.state.currentSource.length !== 0)
            this.state.currentCountry = '';
        else
            this.state.currentCountry = defaultCountry;
        let currentUrl = 'https://newsapi.org/v2/top-headlines?' +
            `country=${this.state.currentCountry}&sources=${this.state.currentSource}&q=${this.state.currentQuery}&` +
            `pageSize=${currentNewsCounter}&page=1&apiKey=` + apiKey;
        const request = new Request(currentUrl);
        fetch(request)
            .then(function (response) {
                return response.json();
            })
            .then((data) => this.setNews(data.articles));

    }

    loadSources() {
        const url = 'https://newsapi.org/v2/sources?apiKey=' + apiKey;
        const request = new Request(url);
        fetch(request)
            .then(function (response) {
                return response.json();
            })
            .then((data) => this.setSources(data.sources));
    }

    sourceClick(id) {
        this.setState({currentSource: id, currentPage: 1, currentQuery: ''}, () => {
            this.loadNews()
        });
        const filterInput = document.querySelector('#filter-input');
        filterInput.value = '';
        this.render();
    }

    render() {
        return (
            <main className="main">
                <div className="scroll">
                    <section className="app-topics-list" id="app-topics-list">
                        {this.state.sources}
                    </section>
                </div>
                <section className="current-source-block" id="current-source-block">
                    <h2 id="current-source-text">{this.state.currentSource}</h2>
                </section>
                <section className="app-filter">
                    <div className="filter-block">
                        <input type="text" id="filter-input" className="filter-input"/>
                        <button id="filter-button" className="filter-button" onClick={this.filterClick}>Filter</button>
                    </div>
                </section>
                <section className="not-found-block" id="not-found-block">
                    <h2 id="not-found-text" hidden={!this.state.isZero}>NOT FOUND</h2>
                </section>
                <section className="app-news-list" id="app-news-list">
                    {this.state.news}
                </section>
                <div className="loading">
                    <button id="btn-load-more" hidden={this.state.isEnd} onClick={this.loadMoreClick}>Load more</button>
                </div>
            </main>
        );
    }

}

export default Main