import { createStore, combineReducers } from 'redux';

import { home, authUser } from './reducers';

const reducers = combineReducers({
    home,
    authUser
});

const store = createStore(reducers);

export default store;