import React, {Component} from 'react'

class NewsItem extends Component {

    constructor(props) {
        super(props);
        this.jsonData = props.item
    }

    render() {
        const article = this.jsonData
        return (
            <div className="news-item">
                <div className="item-image">
                    <img className="image" src={article.urlToImage} alt="news-image"/>
                </div>
                <div className="item-content">
                    <h2 className="item-title">{article.title}</h2>
                    <h3 className="item-source">{article.source.name}</h3>
                    <p className="item-text">{article.description}</p>
                    <a className="item-link" href={article.url}>Read more...</a>
                </div>
            </div>
        )
    }
}

export default NewsItem