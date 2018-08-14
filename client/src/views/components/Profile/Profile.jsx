import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import './Profile.css';

import { getUserProfile } from '../../../core/actions';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.followUser = this.followUser.bind(this);
    }

    componentWillMount() {
        console.log('this.props.match.params: ', this.props.match.params);
        this.props.getUserProfile(this.props.match.params.id)
    }

    followUser() {
        console.log('followUser');
        // if(localStorage.Auth) {
        //     console.log('followUser');
        //     const articleDetail = this.props.articleDetail;
        //     const user = this.props.user;
        //     var pathname = this.props.location.pathname;
        //     var n = pathname.lastIndexOf('-');
        //     var id = pathname.slice(n + 1, pathname.length);
        //     this.props.followUser(user._id, articleDetail.author._id, id);
        // } else {
        //     this.props.toggleDialogOpen({ signIn: true, signUp: false });
        // }
    }

    render() {
        const articleDetail = this.props.articleDetail;
        const user = this.props.user;
        const profile = this.props.profile;
        let classActiceFollowing = "";
        console.log('typeOf: ', typeof(profile));
        // if(user.following.indexOf(articleDetail.author._id) > -1) {
        //     classActiceFollowing = "is-active";
        // }

        if(profile == undefined || Object.keys(profile).length == 0) {
            return (
                <div className="row pt-5 container homeContainer main">
                    <div className="profile-container">
                    </div>
                </div>
            )
        }
        let isEdit = false;
        if(profile.user._id == user._id) {
            isEdit = true;
        }

        return(
            <div className="row pt-5 container homeContainer main">
                <div className="profile-container">
                <Grid item xs={12} sm={12} className="banner-container">
                    <Grid item xs={9} sm={9}>
                        <div className="user-info">
                            <h1 className="user-name">Amando Abreu</h1>
                            <div className="user-follow">
                                {isEdit ? <ButtonEdit /> : <ButtonFollow followUser={this.followUser} classActiceFollowing="" />}
                            </div>
                        </div>
                        <div className="user-des">
                            <p className="user-des-content"></p>
                        </div>
                        <div className="number-follower">
                            <span className="number-follower-content">
                                <div className="content-row">
                                    <div className="follow">
                                        <Link to="/" className="link">
                                            {profile.user.following.length + " Following"}
                                        </Link>
                                    </div>
                                    <div className="follow">
                                        <Link to="/" className="link">
                                            {profile.user.followers.length + " Followers"}
                                        </Link>
                                    </div>
                                    <div className="follow-dot">·</div>
                                    <div className="twitter-content">
                                        <div className="twitter-icon">
                                        <a href="" >
                                            <svg width="21" height="21" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" className="j">
                                            <path d="M18.5 4.43a6.9 6.9 0 0 1-2.18.88 3.45 3.45 0 0 0-2.55-1.12 3.49 3.49 0 0 0-3.49 3.48c0 .28.03.55.07.81a9.91 9.91 0 0 1-7.17-3.67 3.9 3.9 0 0 0-.5 1.74 3.6 3.6 0 0 0 1.56 2.92 3.36 3.36 0 0 1-1.55-.44.15.15 0 0 0 0 .06c0 1.67 1.2 3.08 2.8 3.42-.3.06-.6.1-.94.12l-.62-.06A3.5 3.5 0 0 0 7.17 15a7.33 7.33 0 0 1-4.36 1.49L2 16.44A9.96 9.96 0 0 0 7.36 18c6.4 0 9.91-5.32 9.9-9.9v-.5A6.55 6.55 0 0 0 19 5.79a6.18 6.18 0 0 1-2 .56 3.33 3.33 0 0 0 1.5-1.93"></path>
                                            </svg>
                                        </a>
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </Grid>
                    <Grid item xs={3} sm={3} className="user-avatar">
                        <img alt="Amando Abreu" src="https://miro.medium.com/fit/c/240/240/0*sohUTbGZyOT3NvyP." className="image-avt" width="120" height="120" />
                    </Grid>
                    
                </Grid>
                </div>
            </div>
        );
    }
}

const ButtonFollow = (props) => {
    return (
        <span className="followState js-followState" data-user-id="">
            <button className="button button--smallest u-noUserSelect button--withChrome u-baseColor--buttonNormal button--withHover button--unblock js-unblockButton u-marginLeft10 u-xs-hide" data-action="sign-up-prompt" data-sign-in-action="toggle-block-user" data-requires-token="true" data-redirect="https://medium.freecodecamp.org/the-art-of-computer-programming-by-donald-knuth-82e275c8764f" data-action-source="post_header_lockup">
                <span className="button-label  button-defaultState">Blocked</span>
                <span className="button-label button-hoverState">Unblock</span>
            </button>
            <button onClick={props.followUser} className={props.classActiceFollowing + " button button--primary button--smallest u-noUserSelect button--withChrome u-accentColor--buttonNormal button--follow js-followButton u-marginLeft10 u-xs-hide"} data-action="sign-up-prompt" data-sign-in-action="toggle-subscribe-user" data-requires-token="true" data-redirect="https://medium.com/_/subscribe/user/3299ebce81f1" data-action-source="post_header_lockup-3299ebce81f1-------------------------follow_byline">
                <span className="button-label  button-defaultState">Follow</span>
                <span className="button-label button-activeState">Following</span>
            </button>
        </span>
    )
}

const ButtonEdit = (props) => {
    return (
        <span className="followState js-followState" data-user-id="">
            <button className={" button button--primary button--smallest u-noUserSelect button--withChrome u-accentColor--buttonNormal button--follow js-followButton u-marginLeft10 u-xs-hide"} data-action="sign-up-prompt" data-sign-in-action="toggle-subscribe-user" data-requires-token="true" data-redirect="https://medium.com/_/subscribe/user/3299ebce81f1" data-action-source="post_header_lockup-3299ebce81f1-------------------------follow_byline">
                <span className="button-label  button-defaultState">Edit Profile</span>
            </button>
        </span>
    )
}

const mapDispatchToProps = (dispatch) => {
    return ({
        getUserProfile: _id => dispatch(getUserProfile(_id))
    })
}

const mapStateToProps = (state) =>({
    articleDetail: state.home.articleDetail,
    common : state.common,
    user : state.authUser.user,
    profile : state.authUser.profile
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);