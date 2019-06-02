import React, {Component} from 'react'

class SourceButton extends Component {

    render() {
        let item = {};
        item = this.props.sourcesItem;
        return(
            <button
                className="topic"
                id = {this.props.id}
                onClick={() => this.props.onClickFunc(this.props.id)}
                >
                {item.name}
            </button>
        )
    }

}

export default SourceButton