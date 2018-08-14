import { SET_USER, CLEAR_USER, SET_PROFILE } from '../constants';

const initialState = {
    isAuth: false,
    user: {},
    profile: {}
}

export default ( state = initialState, action ) => {
    console.log('reducers-authUser: ', action);
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                isAuth: Object.keys(action.user).length > 0 ? true : false,
                user: action.user
            }

        case CLEAR_USER:
            return {
                ...state,
                isAuth: false,
                user: {}
            }

        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        
        default:
            return state;
    }
}
