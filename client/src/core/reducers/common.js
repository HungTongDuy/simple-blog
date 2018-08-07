import { TOGGLE_CLOSE_DIALOG_SIGNIN, TOGGLE_OPEN_DIALOG_SIGNIN, PROGRESS_PUBLISH } from '../constants';

const initialState = {
    openDialogSignin: false,
    loadingPublish: false,
    signUp: false,
    SignIn: false,
    isEditArticle: false
}

export default ( state = initialState, action ) => {
    console.log('reducers-common: ', action);
    switch(action.type) {
        case TOGGLE_CLOSE_DIALOG_SIGNIN:
            return {
                ...state,
                openDialogSignin: !state.openDialogSignin
            }
        
        case TOGGLE_OPEN_DIALOG_SIGNIN:
            return {
                ...state,
                signIn: action.data.signIn,
                signUp: action.data.signUp,
                openDialogSignin: !state.openDialogSignin
            }

        case PROGRESS_PUBLISH:
            return {
                ...state,
                loadingPublish: action.data
            }
        
        default:
            return state;
    }
}
