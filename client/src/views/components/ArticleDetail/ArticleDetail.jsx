import React from 'react';

class ArticleDetail extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log('this.props.params', this.props.match);
        return (
            <div>
                <h2>components -? DetailArticle</h2>
            </div>
        );
    }
}

export default ArticleDetail;