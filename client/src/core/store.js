import { createStore, combineReducers } from 'redux';

import { home, authUser, common } from './reducers';

const reducers = combineReducers({
    home,
    authUser,
    common
});

const store = createStore(reducers);

export default store;