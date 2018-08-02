import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import ArticleDetail from './components/ArticleDetail';
import Header from './components/Header';
import Home from './screens/Home';
import AddArticle from './screens/Article/AddArticle/AddArticle';

import './app.css';

const App = () => {
    console.log('app.js');
    return (
        <div>
            <Header />
            <div className="row pt-5 container homeContainer">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/article/:title-and-2018-:id" component={ArticleDetail} />
                    <Route path="/categories" />
                    <Route path="/article/editor" component={AddArticle} />
                </Switch>
            </div>
        </div>
    )
}

export default withRouter(App);