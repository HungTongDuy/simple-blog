import { SET_USER } from '../constants';

const initialState = {
    isAuth: false,
    user: {},
    redirect: false
}

export default ( state = initialState, action ) => {
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                isAuth: Object.keys(action.user).length > 0 ? true : false,
                user: action.user,
                redirect: true
            }
        
        default:
            return state;
    }
}
