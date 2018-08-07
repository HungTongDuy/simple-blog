"use strict";

import { 
    API_USER_SIGNIN_URL, 
    CLEAR_USER, 
    SET_USER, 
    API_USER_URL, 
    TOGGLE_OPEN_DIALOG_SIGNIN,
    TOGGLE_CLOSE_DIALOG_SIGNIN,
    PROGRESS_PUBLISH,
    API_ARTICLE_URL,
    API_LOGIN_URL
} from '../constants';
import axios from 'axios';

export const getUser = (_id) => {
    return axios.get(API_USER_URL + _id).then((res)=>{
        return res.data
    }).catch(err=>console.log(err))
}

export const signInWithGoogle = (data) => {
    return (dispatch) => {
        console.log('SignUpUserWithGoogle', data);
        let postData = {
            name: data.w3.ig,
            provider: 'google',
            email: data.w3.U3,
            provider_id: data.El,
            token: data.Zi.access_token,
            provider_pic: data.w3.Paa
        }
        console.log('SignInWithGoogle-postData: ', postData);
        axios.post(API_USER_URL, postData).then((res) => {
            let user = res.data;
            localStorage.setItem('Auth', JSON.stringify(user));
            dispatch({type: SET_USER, user});
            dispatch(toggleDialogClose());
        }).catch((err)=>{console.log(err);})
    }
};

export const signInWithFacebook = (data) => {
    let userId = data.tokenDetail.userID;
    let accessToken = data.tokenDetail.accessToken;
    var url_api = `http://graph.facebook.com/${userId}/?fields=picture&type=large&access_token=${accessToken}`;

    return (dispatch) => {
        axios.get(url_api)
        .then((res) => {
            console.log('respone-picture: ', res.data);
            data.picture = res.data.picture.data;

            let postData = {
                email : data.profile.email,
                name : data.profile.name,
                provider : 'facebook',
                provider_id : data.profile.id,
                provider_pic : data.picture.url,
                token : data.tokenDetail.accessToken,
            };
            console.log('SignInWithFacebook-postData: ', postData);
            axios.post(API_USER_URL, postData).then((res) => {
                let user = res.data;
                localStorage.setItem('Auth', JSON.stringify(user));
                dispatch({type: SET_USER, user});
                dispatch(toggleDialogClose());
            }).catch((err)=>{console.log(err);})

        }).catch(err=>console.log(err))
    }
}

export const signInWithAccount = (data) => {
    return (dispatch) => {
        console.log('signInWithAccount', data);        
        axios.post(API_LOGIN_URL, data).then((res) => {
            let user = res.data;
            localStorage.setItem('Auth', JSON.stringify(user));
            dispatch({type: SET_USER, user});
            dispatch(toggleDialogClose());
        }).catch((err)=>{console.log(err);})
    }
}

export const signUpWithAccount = (data) => {
    return (dispatch) => {
        console.log('signUpWithAccount', data);
        axios.post(API_USER_URL, data).then((res) => {
            let user = res.data;
            localStorage.setItem('Auth', JSON.stringify(user));
            dispatch({type: SET_USER, user});
            dispatch(toggleDialogClose());
        }).catch((err)=>{console.log(err);})
    }
}

export const toggleDialogOpen = (data) => {
    console.log('toggleDialog', data);
    return (dispatch) => {
        dispatch({ type: TOGGLE_OPEN_DIALOG_SIGNIN, data })
    }
}

export const toggleDialogClose = data => {
    console.log('toggleDialog', data);
    return (dispatch) => {
        dispatch({ type: TOGGLE_CLOSE_DIALOG_SIGNIN })
    }
}

export const signOut = data => {
    return (dispatch) => {
        dispatch({ type: CLEAR_USER,  user: JSON.parse(localStorage.Auth) });
        localStorage.removeItem('Auth');
    }
}

export const onLoadProgress = data => {
    console.log('onLoadProgress---', data);
    return (dispatch) => {
        dispatch({ type: PROGRESS_PUBLISH, data })
    }
}

export const onSubmitPublish = formdata => {
    console.log('formdata', formdata);
    return (dispatch) => {
        dispatch(onLoadProgress(false));
        axios.post(API_ARTICLE_URL, formdata).then((res) => {
            dispatch(onLoadProgress(false));
        }).catch((err)=>{
            console.log(err);
        })
        //dispatch({ type: SUBMIT_ARTICLE, article })
    }
}