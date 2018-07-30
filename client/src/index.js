import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Route, Switch, Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './core/store';
import App from './views/app';

import '../resources/scss/style.scss';

ReactDOM.render(
    <Router history={createHistory()}>
        <Provider store={store}>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </Provider>
    </Router>,
    document.getElementById('root'),
);