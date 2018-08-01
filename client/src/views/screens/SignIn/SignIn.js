import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './SignIn.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Redirect } from 'react-router-dom'

import { API_SIGNIN_URL, API_USER_URL } from '../../../core/constants';

import GoogleLogin from 'react-google-login';


class SignIn extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            loading: false,
            email: '',
            password: '',
            showPassword: false,
            redirect: false,
            open: false,
        }

        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.submitSignIn = this.submitSignIn.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleChangePassword(e) {
        console.log('password', e.target.value);
        this.setState({ password: e.target.value });
    };

    handleChangeEmail(e) {
        console.log('email', e.target.value);
        this.setState({ email: e.target.value });
    }

    handleMouseDownPassword(event) {
        event.preventDefault();
    };
    
    handleClickShowPassword() {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    submitSignIn() {
        var me = this.context;
        this.setState({
            loading: true
        })
        var postData = {};
        postData.email = this.state.email;
        postData.password = this.state.password;
        axios.post(API_SIGNIN_URL, postData).then((res) => {
            console.log('res', res);
            if (res.data == true) {
                this.setState({
                    loading: false,
                    redirect: true
                });
            } else {
                this.setState({
                    loading: false,
                    open: true
                });
            }
        }).catch((err)=>{console.log(err); this.setState({loading: false})})
    }

    handleClose(){
        this.setState({ open: false });
    };

    render() {
        //console.log('authUser', this.props.authUser);
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
        const { SignInUser, SignUpUser } = this.props;
        const responseGoogle = (res) => {
            console.log('resGoodle', res.profileObj);
            let postData = {
                name: res.w3.ig,
                provider: 'google',
                email: res.w3.U3,
                provider_id: res.El,
                token: res.Zi.access_token,
                provider_pic: res.w3.Paa
            }
            console.log(postData);
            SignUpUser(postData);
            // build our user data
            //this.props.SignInUser(postData)
            //this.props.toggleClose()
        }
        return(
            <CardContent>
                <Grid container spacing={24} item xs={4} sm={4} className="signin-container">
                    <Grid item xs={12} sm={12}>
                        <h2 className="signin-title">SignIn</h2>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            id="with-placeholder"
                            label="Email"
                            placeholder="Email"
                            className="textField"
                            margin="normal"
                            onChange={this.handleChangeEmail}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <FormControl className="textField">
                            <InputLabel htmlFor="adornment-password">Password</InputLabel>
                            <Input
                                id="adornment-password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={this.handleChangePassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                        >
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} className="signin-grid-button">
                        <GoogleLogin className="button google"
                        clientId="344016612305-frbv9ieqm5h9elj88lj3kuimct69r48e.apps.googleusercontent.com"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle} >
                            <span className="svgIcon svgIcon--googleNew svgIcon--25px">
                                <svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25">
                                    <g fill="none" fillRule="evenodd">
                                        <path d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z" fill="#4285F4"></path>
                                        <path d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z" fill="#34A853"></path>
                                        <path d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z" fill="#FBBC05"></path>
                                        <path d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z" fill="#EA4335"></path>
                                    </g>
                                </svg>
                            </span>
                            <span className="button-label  js-buttonLabel">Sign up with Google</span>
                            {/* <i className="fa fa-google"></i><span> SignIn with Google</span> */}
                        </GoogleLogin>
                        {/* <button class="button button--large button--borderless button--withChrome u-baseColor--buttonNormal button--withIcon button--withSvgIcon button--withIconAndLabel u-boxShadow u-textAlignLeft u-marginBottom15 u-backgroundWhite u-textColorDarker u-sm-width220 u-sm-marginRight20 u-xs-marginRight0 u-sizeFullWidth js-googleButton is-touched" data-action="google-auth" data-action-value="register" data-action-source="--------------------------nav_reg" data-redirect="https://medium.com/?source=--------------------------nav_reg">
                            <span class="svgIcon svgIcon--googleNew svgIcon--25px">
                                <svg class="svgIcon-use" width="25" height="25" viewBox="0 0 25 25">
                                    <g fill="none" fill-rule="evenodd">
                                        <path d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z" fill="#4285F4"></path>
                                        <path d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z" fill="#34A853"></path>
                                        <path d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z" fill="#FBBC05"></path>
                                        <path d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z" fill="#EA4335"></path>
                                    </g>
                                </svg>
                            </span>
                            <span class="button-label  js-buttonLabel">Sign up with Google</span>
                        </button> */}
                    </Grid>
                    <Grid item xs={12} sm={12} className="signin-grid-button">
                        <Button 
                            onClick={this.submitSignIn} 
                            variant="contained" 
                            className="btn btn-primary float-right" 
                            color="primary" >
                            Sign In
                        </Button>
                        { !this.state.loading ? '' :
                            <LinearProgress />
                        }
                    </Grid>
                </Grid>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please check email or password.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    SignInUser: data => {console.log('SignInUser', data); /*dispatch({ type: SUBMIT_ARTICLE, data })*/},
    SignUpUser: data => {
        //data.push({password : ''});
        console.log('SignUpUser', data);
        localStorage.setItem('Auth', JSON.stringify(data));
        console.log('localStorage', localStorage.Auth);
        
        /*dispatch({ type: SUBMIT_ARTICLE, data })*/
        axios.post(API_USER_URL, data).then((res) => {
            console.log('res', res);

            // if(res.data.hasOwnProperty('provider_id')) {

            // }
            // if (res.data == true) {
            //     this.setState({
            //         loading: false,
            //         redirect: true
            //     });
            // } else {
            //     this.setState({
            //         loading: false,
            //         open: true
            //     });
            // }

        }).catch((err)=>{console.log(err);})
    }
});

const mapStateToProps = state => {
    console.log('state', state);
    return {
        articleToEdit: state.home.articleToEdit,
        authUser: state.authUser
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);