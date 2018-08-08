import { SET_USER, CLEAR_USER } from '../constants';

const initialState = {
    isAuth: false,
    user: {},
    redirect: false
}

export default ( state = initialState, action ) => {
    console.log('reducers-authUser: ', action);
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                isAuth: Object.keys(action.user).length > 0 ? true : false,
                user: action.user,
                redirect: true
            }

        case CLEAR_USER:
            return {
                ...state,
                isAuth: false,
                user: {}
            }
        
        default:
            return state;
    }
}
