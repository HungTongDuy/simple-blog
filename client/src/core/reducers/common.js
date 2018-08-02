import { TOGGLE_DIALOG_SIGNIN } from '../constants';

const initialState = {
    openDialogSignin: false
}

export default ( state = initialState, action ) => {
    console.log('reducers-common: ', action);
    switch(action.type) {
        case TOGGLE_DIALOG_SIGNIN:
            return {
                ...state,
                openDialogSignin: !state.openDialogSignin
            }
        
        default:
            return state;
    }
}
