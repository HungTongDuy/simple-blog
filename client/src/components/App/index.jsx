import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import { Home,  ArticleDetail, Editor, Header } from '../../components';

const App = (props) => {
    return (
        <div>
            <Header />
            <div className="row pt-5 container homeContainer">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/article/:title-and-2018-:id" component={ArticleDetail} />
                    <Route path="/categories" />
                    <Route path="/article/editor" component={Editor} />
                </Switch>
            </div>
        </div>
    )
}

export default withRouter(App);