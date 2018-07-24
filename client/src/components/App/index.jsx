import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import { Home,  ArticleDetail} from '../../components';

const App = (props) => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/article/:title-and-2018-:id" component={ArticleDetail} />
            <Route path="/categories" />
        </Switch>
    )
}

export default withRouter(App);