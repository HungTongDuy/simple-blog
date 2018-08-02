import { API_SIGNIN_URL, CLEAR_USER, SET_USER, API_USER_URL } from '../constants';
import axios from 'axios';



export function SignInUser (data) {
    return(dispatch) => {
        console.log('SignInUser', API_SIGNIN_URL); 
        /*dispatch({ type: SUBMIT_ARTICLE, data })*/
    }
}

export function SignOutUser(data) {
    return(dispatch) => {
        dispatch({ type: CLEAR_USER,  user: localStorage.Auth });
    }
}

export function getUser(_id) {
    return axios.get(API_USER_URL + _id).then((res)=>{
        return res.data
    }).catch(err=>console.log(err))
}