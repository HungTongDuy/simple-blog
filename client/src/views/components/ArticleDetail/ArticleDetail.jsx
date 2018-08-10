import React from 'react';
import { connect } from 'react-redux';

import { getArticleDetail, clapArticle } from '../../../core/actions';

import Avatar from '@material-ui/core/Avatar';

import './ArticleDetail.css';

import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

class ArticleDetail extends React.Component {

    constructor(props) {
        super(props);

        this.formatDate = this.formatDate.bind(this);
        this.clapArticle = this.clapArticle.bind(this);
    }

    componentWillMount() {
        var pathname = this.props.location.pathname;
        var n = pathname.lastIndexOf('-');
        var id = pathname.slice(n + 1, pathname.length);
        this.props.getArticleDetail(id);
    }

    formatDate(date) {
        date = new Date(date);
        var monthNames = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun", "Jul",
            "Aug", "Sep", "Oct",
            "Nov", "Dec"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return monthNames[monthIndex] + ' ' + day + ', ' + year;
    }

    clapArticle() {
        var pathname = this.props.location.pathname;
        var n = pathname.lastIndexOf('-');
        var id = pathname.slice(n + 1, pathname.length);
        this.props.clapArticle(id);
    }

    render() {
        //console.log('this.props.articleDetail----', this.props.articleDetail);

        const articleDetail = this.props.articleDetail;
        const user = this.props.user;
        console.log('articleDetail', articleDetail);
        console.log('user--- ', user);

        if(articleDetail == undefined || articleDetail == null) {
            return (
                <article className=" u-minHeight100vhOffset65 u-overflowHidden postArticle postArticle--full is-withAccentColors u-marginBottom40" lang="en">
                </article>
            )
        }

        return (
            <article className=" u-minHeight100vhOffset65 u-overflowHidden postArticle postArticle--full is-withAccentColors u-marginBottom40" lang="en">
                {/*-----------start header page ariticle view----------*/}
                <header className="container u-maxWidth740">
                    <div className="uiScale uiScale-ui--regular uiScale-caption--regular postMetaHeader u-paddingBottom10 row">
                        <div className="col u-size12of12 js-postMetaLockup">
                            <div className="uiScale uiScale-ui--regular uiScale-caption--regular postMetaLockup postMetaLockup--authorWithBio u-flexCenter js-postMetaLockup">
                                <div className="u-flex0">
                                    <a className="link u-baseColor--link avatar is-touched" href="#" data-action="show-user-card" data-action-source="post_header_lockup" data-action-value="" data-action-type="hover" data-user-id="" dir="auto">
                                        <Avatar alt={"Go to the profile of " + user.name} src={user.provider_pic} className="avatar-image avatar-image--small" /> 
                                    </a>
                                </div>
                                <div className="u-flex1 u-paddingLeft15 u-overflowHidden">
                                    <div className="u-lineHeightTightest">
                                        <a className="ds-link ds-link--styleSubtle ui-captionStrong u-inlineBlock link link--darken link--darker" href="" data-action="show-user-card" data-action-source="post_header_lockup" data-action-value="3299ebce81f1" data-action-type="hover" data-user-id="3299ebce81f1" data-collection-slug="free-code-camp" dir="auto">
                                            {user.name}
                                        </a>
                                        <span className="followState js-followState" data-user-id="3299ebce81f1">
                                            <button className="button button--smallest u-noUserSelect button--withChrome u-baseColor--buttonNormal button--withHover button--unblock js-unblockButton u-marginLeft10 u-xs-hide" data-action="sign-up-prompt" data-sign-in-action="toggle-block-user" data-requires-token="true" data-redirect="https://medium.freecodecamp.org/the-art-of-computer-programming-by-donald-knuth-82e275c8764f" data-action-source="post_header_lockup">
                                                <span className="button-label  button-defaultState">Blocked</span>
                                                <span className="button-label button-hoverState">Unblock</span>
                                            </button>
                                            <button className="button button--primary button--smallest u-noUserSelect button--withChrome u-accentColor--buttonNormal button--follow js-followButton u-marginLeft10 u-xs-hide" data-action="sign-up-prompt" data-sign-in-action="toggle-subscribe-user" data-requires-token="true" data-redirect="https://medium.com/_/subscribe/user/3299ebce81f1" data-action-source="post_header_lockup-3299ebce81f1-------------------------follow_byline">
                                                <span className="button-label  button-defaultState">Follow</span>
                                                <span className="button-label button-activeState">Following</span>
                                            </button>
                                        </span>
                                    </div>
                                    {/* <div className="ui-caption ui-xs-clamp2 postMetaInline">🤓 Nerd coach 🚗 Built Zipcar's technology ♻️ Yerdle co-founder. San Francisco</div> */}
                                    <div className="ui-caption postMetaInline js-testPostMetaInlineSupplemental">
                                        <time dateTime={articleDetail.createdAt}>{this.formatDate(articleDetail.createdAt)}</time><span className="middotDivider u-fontSize12"></span><span className="readingTime" title="5 min read"></span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                {/*-----------end header page ariticle view----------*/}
                {/*-----------start content ariticle view----------*/}
                <div className="postArticle-content js-postField js-notesSource js-trackedPost" data-post-id="82e275c8764f" data-source="post_page" data-collection-id="336d898217ee" data-tracking-context="postPage" data-scroll="native">
                    <section name="6da4" className="section section--body section--first">
                        <div className="section-content">
                            <div className="section-inner sectionLayout--insetColumn">
                                <h1 id={articleDetail._id} id={articleDetail._id} className="graf graf--h3 graf--startsWithSingleQuote graf--leading graf--title">
                                    {articleDetail.title ? articleDetail.title : ''}
                                </h1>
                                <figure id={articleDetail._id} className="graf graf--figure graf-after--h3">
                                    <div className="aspectRatioPlaceholder is-locked" >
                                        <div className="aspectRatioPlaceholder-fill" ></div>
                                        <div className="progressiveMedia js-progressiveMedia graf-image is-canvasLoaded is-imageLoaded" data-image-id="1*IJlgGsOIpq0lKTdf6lZATA.png" data-width="1024" data-height="1024" data-focus-x="77" data-focus-y="26" data-action="zoom" data-action-value="1*IJlgGsOIpq0lKTdf6lZATA.png" data-scroll="native">
                                            <div className="js-progressiveMedia-inner">
                                                <img className="progressiveMedia-noscript js-progressiveMedia-inner" src={articleDetail.feature_img} />
                                            </div>
                                        </div>
                                    </div>
                                </figure>
                                
                                {/* <div className="graf graf--p">
                                    <FroalaEditorView model={articleDetail.text} /> 
                                </div> */}
                                <p className="graf graf--p" dangerouslySetInnerHTML={{__html: articleDetail.text}} />                                
                                {/* {this.parseFromString(articleDetail.text)} */}
                            </div>
                        </div>
                    </section>
                </div>
                {/*-----------end content ariticle view----------*/}
                <footer className="u-paddingTop10">
                    {/*-----------start button follow----------*/}
                    <div className="container u-maxWidth740">
                        <div className="postActions js-postActionsFooter">
                            <div className="u-flexCenter">
                                <div className="u-flex1">
                                    <div className="multirecommend js-actionMultirecommend u-flexCenter u-width60" data-post-id="82e275c8764f" data-is-icon-29px="true" data-is-circle="true" data-has-recommend-list="true" data-source="post_actions_footer-----82e275c8764f---------------------clap_footer">
                                        <div className="u-relative u-foreground">
                                            <button className="button button--large button--circle button--withChrome u-baseColor--buttonNormal button--withIcon button--withSvgIcon clapButton js-actionMultirecommendButton clapButton--largePill u-relative u-foreground u-xs-paddingLeft13 u-width60 u-height60 u-accentColor--textNormal u-accentColor--buttonNormal clap-onboardingcollection" data-action="sign-up-prompt" data-sign-in-action="multivote" data-requires-token="true" data-redirect="https://medium.com/_/vote/p/82e275c8764f" data-action-source="post_actions_footer-----82e275c8764f---------------------clap_footer" aria-label="Clap">
                                                <span className="button-defaultState">
                                                    <span className="svgIcon svgIcon--clap svgIcon--33px u-relative u-topNegative2 u-xs-top0">
                                                        <svg className="svgIcon-use" width="33" height="33" viewBox="0 0 33 33">
                                                        <path d="M28.86 17.342l-3.64-6.402c-.292-.433-.712-.729-1.163-.8a1.124 1.124 0 0 0-.889.213c-.63.488-.742 1.181-.33 2.061l1.222 2.587 1.4 2.46c2.234 4.085 1.511 8.007-2.145 11.663-.26.26-.526.49-.797.707 1.42-.084 2.881-.683 4.292-2.094 3.822-3.823 3.565-7.876 2.05-10.395zm-6.252 11.075c3.352-3.35 3.998-6.775 1.978-10.469l-3.378-5.945c-.292-.432-.712-.728-1.163-.8a1.122 1.122 0 0 0-.89.213c-.63.49-.742 1.182-.33 2.061l1.72 3.638a.502.502 0 0 1-.806.568l-8.91-8.91a1.335 1.335 0 0 0-1.887 1.886l5.292 5.292a.5.5 0 0 1-.707.707l-5.292-5.292-1.492-1.492c-.503-.503-1.382-.505-1.887 0a1.337 1.337 0 0 0 0 1.886l1.493 1.492 5.292 5.292a.499.499 0 0 1-.353.854.5.5 0 0 1-.354-.147L5.642 13.96a1.338 1.338 0 0 0-1.887 0 1.338 1.338 0 0 0 0 1.887l2.23 2.228 3.322 3.324a.499.499 0 0 1-.353.853.502.502 0 0 1-.354-.146l-3.323-3.324a1.333 1.333 0 0 0-1.886 0 1.325 1.325 0 0 0-.39.943c0 .356.138.691.39.943l6.396 6.397c3.528 3.53 8.86 5.313 12.821 1.353zM12.73 9.26l5.68 5.68-.49-1.037c-.518-1.107-.426-2.13.224-2.89l-3.303-3.304a1.337 1.337 0 0 0-1.886 0 1.326 1.326 0 0 0-.39.944c0 .217.067.42.165.607zm14.787 19.184c-1.599 1.6-3.417 2.392-5.353 2.392-.349 0-.7-.03-1.058-.082a7.922 7.922 0 0 1-3.667.887c-3.049 0-6.115-1.626-8.359-3.87l-6.396-6.397A2.315 2.315 0 0 1 2 19.724a2.327 2.327 0 0 1 1.923-2.296l-.875-.875a2.339 2.339 0 0 1 0-3.3 2.33 2.33 0 0 1 1.24-.647l-.139-.139c-.91-.91-.91-2.39 0-3.3.884-.884 2.421-.882 3.301 0l.138.14a2.335 2.335 0 0 1 3.948-1.24l.093.092c.091-.423.291-.828.62-1.157a2.336 2.336 0 0 1 3.3 0l3.384 3.386a2.167 2.167 0 0 1 1.271-.173c.534.086 1.03.354 1.441.765.11-.549.415-1.034.911-1.418a2.12 2.12 0 0 1 1.661-.41c.727.117 1.385.565 1.853 1.262l3.652 6.423c1.704 2.832 2.025 7.377-2.205 11.607zM13.217.484l-1.917.882 2.37 2.837-.454-3.719zm8.487.877l-1.928-.86-.44 3.697 2.368-2.837zM16.5 3.293L15.478-.005h2.044L16.5 3.293z" fillRule="evenodd">
                                                        </path>
                                                        </svg>
                                                    </span>
                                                </span>
                                                <span className="button-activeState">
                                                    <span className="svgIcon svgIcon--clapFilled svgIcon--33px u-relative u-topNegative2 u-xs-top0">
                                                        <svg className="svgIcon-use" width="33" height="33" viewBox="0 0 33 33">
                                                        <g fillRule="evenodd">
                                                            <path d="M29.58 17.1l-3.854-6.78c-.365-.543-.876-.899-1.431-.989a1.491 1.491 0 0 0-1.16.281c-.42.327-.65.736-.7 1.207v.001l3.623 6.367c2.46 4.498 1.67 8.802-2.333 12.807-.265.265-.536.505-.81.728 1.973-.222 3.474-1.286 4.45-2.263 4.166-4.165 3.875-8.6 2.215-11.36zm-4.831.82l-3.581-6.3c-.296-.439-.725-.742-1.183-.815a1.105 1.105 0 0 0-.89.213c-.647.502-.755 1.188-.33 2.098l1.825 3.858a.601.601 0 0 1-.197.747.596.596 0 0 1-.77-.067L10.178 8.21c-.508-.506-1.393-.506-1.901 0a1.335 1.335 0 0 0-.393.95c0 .36.139.698.393.95v.001l5.61 5.61a.599.599 0 1 1-.848.847l-5.606-5.606c-.001 0-.002 0-.003-.002L5.848 9.375a1.349 1.349 0 0 0-1.902 0 1.348 1.348 0 0 0 0 1.901l1.582 1.582 5.61 5.61a.6.6 0 0 1-.848.848l-5.61-5.61c-.51-.508-1.393-.508-1.9 0a1.332 1.332 0 0 0-.394.95c0 .36.139.697.393.952l2.363 2.362c.002.001.002.002.002.003l3.52 3.52a.6.6 0 0 1-.848.847l-3.522-3.523h-.001a1.336 1.336 0 0 0-.95-.393 1.345 1.345 0 0 0-.949 2.295l6.779 6.78c3.715 3.713 9.327 5.598 13.49 1.434 3.527-3.528 4.21-7.13 2.086-11.015zM11.817 7.727c.06-.328.213-.64.466-.893.64-.64 1.755-.64 2.396 0l3.232 3.232c-.82.783-1.09 1.833-.764 2.992l-5.33-5.33z">
                                                            </path>
                                                            <path d="M13.285.48l-1.916.881 2.37 2.837z"></path>
                                                            <path d="M21.719 1.361L19.79.501l-.44 3.697z"></path>
                                                            <path d="M16.502 3.298L15.481 0h2.043z"></path>
                                                        </g>
                                                        </svg>
                                                    </span>
                                                </span>
                                            </button>
                                            <div className="clapUndo u-width60 u-round u-height32 u-absolute u-borderBox u-paddingRight5 u-transition--transform200Spring u-background--brandSageLighter js-clapUndo">
                                                <button className="button button--chromeless u-baseColor--buttonNormal button--withIcon button--withSvgIcon u-floatRight" data-action="multivote-undo" data-action-value="82e275c8764f"><span className="svgIcon svgIcon--removeThin svgIcon--29px"><svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29"><path d="M20.13 8.11l-5.61 5.61-5.609-5.61-.801.801 5.61 5.61-5.61 5.61.801.8 5.61-5.609 5.61 5.61.8-.801-5.609-5.61 5.61-5.61" fillRule="evenodd"></path></svg></span></button>
                                            </div>
                                        </div><span className="u-textAlignCenter u-relative u-background js-actionMultirecommendCount u-marginLeft10"><button className="button button--chromeless u-baseColor--buttonNormal js-multirecommendCountButton" data-action="show-recommends" data-action-value="82e275c8764f">{articleDetail.claps}</button></span></div>
                                </div>
                                <div className="buttonSet u-flex0">
                                    <button className="button button--large button--dark button--chromeless is-touchIconBlackPulse u-baseColor--buttonDark button--withIcon button--withSvgIcon" data-action="scroll-to-responses" data-action-source="post_actions_footer">
                                        <span className="svgIcon svgIcon--response svgIcon--29px">
                                            <svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29">
                                            <path d="M21.27 20.058c1.89-1.826 2.754-4.17 2.754-6.674C24.024 8.21 19.67 4 14.1 4 8.53 4 4 8.21 4 13.384c0 5.175 4.53 9.385 10.1 9.385 1.007 0 2-.14 2.95-.41.285.25.592.49.918.7 1.306.87 2.716 1.31 4.19 1.31.276-.01.494-.14.6-.36a.625.625 0 0 0-.052-.65c-.61-.84-1.042-1.71-1.282-2.58a5.417 5.417 0 0 1-.154-.75zm-3.85 1.324l-.083-.28-.388.12a9.72 9.72 0 0 1-2.85.424c-4.96 0-8.99-3.706-8.99-8.262 0-4.556 4.03-8.263 8.99-8.263 4.95 0 8.77 3.71 8.77 8.27 0 2.25-.75 4.35-2.5 5.92l-.24.21v.32c0 .07 0 .19.02.37.03.29.1.6.19.92.19.7.49 1.4.89 2.08-.93-.14-1.83-.49-2.67-1.06-.34-.22-.88-.48-1.16-.74z">
                                            </path>
                                            </svg>
                                        </span>
                                    </button>
                                    <button className="button button--chromeless u-baseColor--buttonNormal" data-action="scroll-to-responses">{articleDetail.comments.length}</button>
                                    <button className="button button--large button--dark button--chromeless is-touchIconBlackPulse u-baseColor--buttonDark button--withIcon button--withSvgIcon u-xs-hide" title="Share on Twitter" aria-label="Share on Twitter" data-action="share-on-twitter" data-action-source="post_actions_footer">
                                        <span className="svgIcon svgIcon--twitter svgIcon--29px">
                                            <svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29">
                                            <path d="M21.967 11.8c.018 5.93-4.607 11.18-11.177 11.18-2.172 0-4.25-.62-6.047-1.76l-.268.422-.038.5.186.013.168.012c.3.02.44.032.6.046 2.06-.026 3.95-.686 5.49-1.86l1.12-.85-1.4-.048c-1.57-.055-2.92-1.08-3.36-2.51l-.48.146-.05.5c.22.03.48.05.75.08.48-.02.87-.07 1.25-.15l2.33-.49-2.32-.49c-1.68-.35-2.91-1.83-2.91-3.55 0-.05 0-.01-.01.03l-.49-.1-.25.44c.63.36 1.35.57 2.07.58l1.7.04L7.4 13c-.978-.662-1.59-1.79-1.618-3.047a4.08 4.08 0 0 1 .524-1.8l-.825.07a12.188 12.188 0 0 0 8.81 4.515l.59.033-.06-.59v-.02c-.05-.43-.06-.63-.06-.87a3.617 3.617 0 0 1 6.27-2.45l.2.21.28-.06c1.01-.22 1.94-.59 2.73-1.09l-.75-.56c-.1.36-.04.89.12 1.36.23.68.58 1.13 1.17.85l-.21-.45-.42-.27c-.52.8-1.17 1.48-1.92 2L22 11l.016.28c.013.2.014.35 0 .52v.04zm.998.038c.018-.22.017-.417 0-.66l-.498.034.284.41a8.183 8.183 0 0 0 2.2-2.267l.97-1.48-1.6.755c.17-.08.3-.02.34.03a.914.914 0 0 1-.13-.292c-.1-.297-.13-.64-.1-.766l.36-1.254-1.1.695c-.69.438-1.51.764-2.41.963l.48.15a4.574 4.574 0 0 0-3.38-1.484 4.616 4.616 0 0 0-4.61 4.613c0 .29.02.51.08.984l.01.02.5-.06.03-.5c-3.17-.18-6.1-1.7-8.08-4.15l-.48-.56-.36.64c-.39.69-.62 1.48-.65 2.28.04 1.61.81 3.04 2.06 3.88l.3-.92c-.55-.02-1.11-.17-1.6-.45l-.59-.34-.14.67c-.02.08-.02.16 0 .24-.01 2.12 1.55 4.01 3.69 4.46l.1-.49-.1-.49c-.33.07-.67.12-1.03.14-.18-.02-.43-.05-.64-.07l-.76-.09.23.73c.57 1.84 2.29 3.14 4.28 3.21l-.28-.89a8.252 8.252 0 0 1-4.85 1.66c-.12-.01-.26-.02-.56-.05l-.17-.01-.18-.01L2.53 21l1.694 1.07a12.233 12.233 0 0 0 6.58 1.917c7.156 0 12.2-5.73 12.18-12.18l-.002.04z">
                                            </path>
                                            </svg>
                                        </span>
                                    </button>
                                    <button className="button button--large button--dark button--chromeless is-touchIconBlackPulse u-baseColor--buttonDark button--withIcon button--withSvgIcon u-xs-hide" title="Share on Facebook" aria-label="Share on Facebook" data-action="share-on-facebook" data-action-source="post_actions_footer">
                                        <span className="svgIcon svgIcon--facebook svgIcon--29px">
                                            <svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29">
                                            <path d="M16.39 23.61v-5.808h1.846a.55.55 0 0 0 .546-.48l.36-2.797a.551.551 0 0 0-.547-.62H16.39V12.67c0-.67.12-.813.828-.813h1.474a.55.55 0 0 0 .55-.55V8.803a.55.55 0 0 0-.477-.545c-.436-.06-1.36-.116-2.22-.116-2.5 0-4.13 1.62-4.13 4.248v1.513H10.56a.551.551 0 0 0-.55.55v2.797c0 .304.248.55.55.55h1.855v5.76c-4.172-.96-7.215-4.7-7.215-9.1 0-5.17 4.17-9.36 9.31-9.36 5.14 0 9.31 4.19 9.31 9.36 0 4.48-3.155 8.27-7.43 9.15M14.51 4C8.76 4 4.1 8.684 4.1 14.46c0 5.162 3.75 9.523 8.778 10.32a.55.55 0 0 0 .637-.543v-6.985a.551.551 0 0 0-.55-.55H11.11v-1.697h1.855a.55.55 0 0 0 .55-.55v-2.063c0-2.02 1.136-3.148 3.03-3.148.567 0 1.156.027 1.597.06v1.453h-.924c-1.363 0-1.93.675-1.93 1.912v1.78c0 .3.247.55.55.55h2.132l-.218 1.69H15.84c-.305 0-.55.24-.55.55v7.02c0 .33.293.59.623.54 5.135-.7 9.007-5.11 9.007-10.36C24.92 8.68 20.26 4 14.51 4">
                                            </path>
                                            </svg>
                                        </span>
                                    </button>
                                    <button className="button button--large button--dark button--chromeless u-baseColor--buttonDark button--withIcon button--withSvgIcon u-xs-show" title="Share this story on Twitter or Facebook" aria-label="Share this story on Twitter or Facebook" data-action="show-share-popover" data-action-source="post_actions_footer">
                                        <span className="svgIcon svgIcon--share svgIcon--29px">
                                            <svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29">
                                            <path d="M20.385 8H19a.5.5 0 1 0 .011 1h1.39c.43 0 .84.168 1.14.473.31.305.48.71.48 1.142v10.77c0 .43-.17.837-.47 1.142-.3.305-.71.473-1.14.473H8.62c-.43 0-.84-.168-1.144-.473a1.603 1.603 0 0 1-.473-1.142v-10.77c0-.43.17-.837.48-1.142A1.599 1.599 0 0 1 8.62 9H10a.502.502 0 0 0 0-1H8.615c-.67 0-1.338.255-1.85.766-.51.51-.765 1.18-.765 1.85v10.77c0 .668.255 1.337.766 1.848.51.51 1.18.766 1.85.766h11.77c.668 0 1.337-.255 1.848-.766.51-.51.766-1.18.766-1.85v-10.77c0-.668-.255-1.337-.766-1.848A2.61 2.61 0 0 0 20.384 8zm-8.67-2.508L14 3.207v8.362c0 .27.224.5.5.5s.5-.23.5-.5V3.2l2.285 2.285a.49.49 0 0 0 .704-.001.511.511 0 0 0 0-.708l-3.14-3.14a.504.504 0 0 0-.71 0L11 4.776a.501.501 0 0 0 .71.706" fillRule="evenodd">
                                            </path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*-----------end button follow----------*/}
                    {/*----------start follow user-----------*/}
                    <div className="u-maxWidth740 u-paddingTop20 u-marginTop20 u-borderTopLightest container u-paddingBottom20 u-xs-paddingBottom10 js-postAttributionFooterContainer">
                        <div className="row js-postFooterInfo">
                            <div className="col u-size6of12 u-xs-size12of12">
                                <li className="uiScale uiScale-ui--small uiScale-caption--regular u-block u-paddingBottom18 js-cardUser">
                                    <div className="u-marginLeft20 u-floatRight">
                                        <span className="followState js-followState" data-user-id="3299ebce81f1">
                                            <button className="button button--small u-noUserSelect button--withChrome u-baseColor--buttonNormal button--withHover button--unblock js-unblockButton" data-action="sign-up-prompt" data-sign-in-action="toggle-block-user" data-requires-token="true" data-redirect="https://medium.freecodecamp.org/the-art-of-computer-programming-by-donald-knuth-82e275c8764f" data-action-source="footer_card">
                                                <span className="button-label  button-defaultState">Blocked</span>
                                                <span className="button-label button-hoverState">Unblock</span>
                                            </button>
                                            <button className="button button--primary button--small u-noUserSelect button--withChrome u-accentColor--buttonNormal button--follow js-followButton" data-action="sign-up-prompt" data-sign-in-action="toggle-subscribe-user" data-requires-token="true" data-redirect="https://medium.com/_/subscribe/user/3299ebce81f1" data-action-source="footer_card-3299ebce81f1-------------------------follow_footer"><span className="button-label  button-defaultState js-buttonLabel">Follow</span><span className="button-label button-activeState">Following</span></button>
                                        </span>
                                    </div>
                                    <div className="u-tableCell">
                                        <a className="link u-baseColor--link avatar is-touched" href="https://medium.freecodecamp.org/@tashian?source=footer_card" title={"Go to the profile of " + user.name} aria-label={"Go to the profile of " + user.name} data-action-source="footer_card" data-user-id="3299ebce81f1" data-collection-slug="free-code-camp" dir="auto">
                                        <Avatar src={user.provider_pic} className="avatar-image avatar-image--small" alt={"Go to the profile of " + user.name} />
                                        {/* <img src="https://cdn-images-1.medium.com/fit/c/60/60/1*GB0Rl0v2mHMEX9nXeRw_tg.jpeg" className="avatar-image avatar-image--small" alt="Go to the profile of Carl Tashian" /> */}
                                        </a>
                                    </div>
                                    <div className="u-tableCell u-verticalAlignMiddle u-breakWord u-paddingLeft15">
                                        <h3 className="ui-h3 u-fontSize18 u-lineHeightTighter u-marginBottom4">
                                            <a className="link link--primary u-accentColor--hoverTextNormal" href="https://medium.freecodecamp.org/@tashian" property="cc:attributionName" title={"Go to the profile of " + user.name} aria-label={"Go to the profile of " + user.name} rel="author cc:attributionUrl" data-user-id="3299ebce81f1" data-collection-slug="free-code-camp" dir="auto">
                                                {user.name}
                                            </a>
                                        </h3>
                                        {/* <p className="ui-body u-fontSize14 u-lineHeightBaseSans u-textColorDark u-marginBottom4">🤓 Nerd coach 🚗 Built Zipcar's technology ♻️ Yerdle co-founder. San Francisco</p> */}
                                    </div>
                                </li>
                            </div>
                            {/* <div className="col u-size6of12 u-xs-size12of12 u-xs-marginTop30">
                                <li className="uiScale uiScale-ui--small uiScale-caption--regular u-block u-paddingBottom18 js-cardCollection">
                                    <div className="u-marginLeft20 u-floatRight">
                                        <button className="button button--primary button--small u-noUserSelect button--withChrome u-accentColor--buttonNormal js-relationshipButton" data-action="sign-up-prompt" data-sign-in-action="toggle-follow-collection" data-requires-token="true" data-redirect="https://medium.com/_/subscribe/collection/free-code-camp" data-action-source="----336d898217ee----------------------follow_footer" data-collection-id="336d898217ee">
                                            <span className="button-label  js-buttonLabel">Follow</span>
                                        </button>
                                    </div>
                                    <div className="u-tableCell ">
                                        <a className="link u-baseColor--link avatar avatar--roundedRectangle" href="https://medium.freecodecamp.org?source=footer_card" title="Go to freeCodeCamp" aria-label="Go to freeCodeCamp" data-action-source="footer_card" data-collection-slug="free-code-camp">
                                            <img src="https://cdn-images-1.medium.com/fit/c/60/60/1*MotlWcSa2n6FrOx3ul89kw.png" className="avatar-image u-size60x60" alt="freeCodeCamp" />
                                        </a>
                                    </div>
                                    <div className="u-tableCell u-verticalAlignMiddle u-breakWord u-paddingLeft15">
                                        <h3 className="ui-h3 u-fontSize18 u-lineHeightTighter u-marginBottom4">
                                            <a className="link link--primary u-accentColor--hoverTextNormal" href="https://medium.freecodecamp.org?source=footer_card" rel="collection" data-action-source="footer_card" data-collection-slug="free-code-camp">
                                            freeCodeCamp
                                            </a>
                                        </h3>
                                        <p className="ui-body u-fontSize14 u-lineHeightBaseSans u-textColorDark u-marginBottom4">Our community publishes stories worth reading on development, design, and data science.</p>
                                        <div className="buttonSet"></div>
                                    </div>
                                </li>
                            </div> */}
                        </div>
                    </div>
                    {/*----------end follow user-----------*/}
                    {/*----------start comment-----------*/}
                    <div className="u-padding0 u-clearfix u-backgroundGrayLightest u-print-hide supplementalPostContent js-responsesWrapper" data-action-scope="_actionscope_5">
                        <div className="responsesStreamWrapper u-maxWidth640 js-responsesStreamWrapper">
                            {/*----------herder comment-----------*/}
                            <div className="container responsesStream-title u-paddingTop15">
                                <div className="row">
                                    <header className="heading">
                                        <div className="u-clearfix">
                                            <div className="heading-content u-floatLeft"><span className="heading-title heading-title--semibold">Responses</span></div>
                                        </div>
                                    </header>
                                </div>
                            </div> 
                            {/*----------start editor comment-----------*/}
                            <div className="responsesStream-editor cardChromeless u-marginBottom20 u-paddingLeft20 u-paddingRight20 js-responsesStreamEditor">
                                <div className="inlineNewPostControl js-inlineNewPostControl" data-action-scope="_actionscope_26">
                                    <div className="inlineEditor is-postEditMode js-inlineEditor is-collapsed" data-action="focus-editor" data-action-scope="_actionscope_28" >
                                        <div className="u-paddingTop20 js-block js-inlineEditorContent">
                                            <div className="inlineEditor-header">
                                                <div className="inlineEditor-avatar u-paddingRight20">
                                                    <div className="avatar u-inline">
                                                    <img src={user.provider_pic} className="avatar-image u-size36x36 u-xs-size32x32" alt={user.name} />
                                                    </div>
                                                </div>
                                                <div className="inlineEditor-headerContent">
                                                    <div className="inlineEditor-placeholder js-inlineEditorPrompt">Write a response…</div>
                                                    <div className="inlineEditor-author u-accentColor--textNormal">{user.name}</div>
                                                </div>
                                            </div>
                                            <div className="block-streamText">
                                                <div className="postArticle postArticle--short">
                                                    <div className="u-maxWidth600" data-scroll="native">
                                                        <div className="postArticle-content js-postField js-notesSource editable" id="editor_129" g_editable="true" role="textbox" contentEditable="true" data-default-value="">
                                                            <section name="7fee" className="section section--body section--first section--last">
                                                                <div className="section-divider">
                                                                    <hr className="section-divider" />
                                                                </div>
                                                                <div className="section-content">
                                                                    <div className="section-inner sectionLayout--insetColumn">
                                                                        <p name="be6a" className="graf graf--p graf--empty graf--leading graf--trailing is-selected" data-scroll="native">
                                                                            <br />
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        </div>
                                                        <div className="inlineTooltip buttonScalableGroup u-hide is-active" >
                                                            <button className="button button--small button--circle button--dark button--withChrome u-baseColor--buttonDark button--withIcon button--withSvgIcon button--inlineTooltipControl js-inlineTooltipControl" title="Add an image, video, embed, or new part" aria-label="Add an image, video, embed, or new part" data-action="inline-menu" tabIndex="-1"><span className="svgIcon svgIcon--addMediaPlus svgIcon--25px"><svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25"><path d="M20 12h-7V5h-1v7H5v1h7v7h1v-7h7" fillRule="evenodd"></path></svg></span></button>
                                                            <div className="inlineTooltip-menu">
                                                                <button className="button button--small button--circle button--dark button--withChrome u-baseColor--buttonDark button--withIcon button--withSvgIcon button--scale u-transitionSeries" title="Add an image" aria-label="Add an image" data-action="inline-menu-image" tabIndex="-1"><span className="svgIcon svgIcon--addMediaImage svgIcon--25px"><svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25"><g fillRule="evenodd"><path d="M4.042 17.05V8.857c0-1.088.842-1.85 1.935-1.85H8.43C8.867 6.262 9.243 5 9.6 5.01L15.405 5c.303 0 .755 1.322 1.177 2 0 .077 2.493 0 2.493 0 1.094 0 1.967.763 1.967 1.85v8.194c-.002 1.09-.873 1.943-1.967 1.943H5.977c-1.093.007-1.935-.85-1.935-1.937zm2.173-9.046c-.626 0-1.173.547-1.173 1.173v7.686c0 .625.547 1.146 1.173 1.146h12.683c.625 0 1.144-.53 1.144-1.15V9.173c0-.626-.52-1.173-1.144-1.173h-3.025c-.24-.63-.73-1.92-.873-2 0 0-5.052.006-5 0-.212.106-.87 2-.87 2l-2.915.003z"></path><path d="M12.484 15.977a3.474 3.474 0 0 1-3.488-3.49A3.473 3.473 0 0 1 12.484 9a3.474 3.474 0 0 1 3.488 3.488c0 1.94-1.55 3.49-3.488 3.49zm0-6.08c-1.407 0-2.59 1.183-2.59 2.59 0 1.408 1.183 2.593 2.59 2.593 1.407 0 2.59-1.185 2.59-2.592 0-1.406-1.183-2.592-2.59-2.592z"></path></g></svg></span></button>
                                                                <button className="button button--small button--circle button--dark button--withChrome u-baseColor--buttonDark button--withIcon button--withSvgIcon button--scale u-transitionSeries" title="Add an image from Unsplash" aria-label="Add an image from Unsplash" data-action="inline-menu-unsplash-image" tabIndex="-1"><span className="svgIcon svgIcon--search svgIcon--25px"><svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25"><path d="M20.067 18.933l-4.157-4.157a6 6 0 1 0-.884.884l4.157 4.157a.624.624 0 1 0 .884-.884zM6.5 11c0-2.62 2.13-4.75 4.75-4.75S16 8.38 16 11s-2.13 4.75-4.75 4.75S6.5 13.62 6.5 11z"></path></svg></span></button>
                                                                <button className="button button--small button--circle button--dark button--withChrome u-baseColor--buttonDark button--withIcon button--withSvgIcon button--scale u-transitionSeries" title="Add a video" aria-label="Add a video" data-action="inline-menu-embed" data-action-value="Paste a YouTube, Vine, Vimeo, or other video link, and press Enter" tabIndex="-1"><span className="svgIcon svgIcon--addMediaVideo svgIcon--25px"><svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25"><path d="M18.8 11.536L9.23 5.204C8.662 4.78 8 5.237 8 5.944v13.16c0 .708.662 1.165 1.23.74l9.57-6.33c.514-.394.606-1.516 0-1.978zm-.993 1.45l-8.294 5.267c-.297.213-.513.098-.513-.264V7.05c0-.36.218-.477.513-.264l8.294 5.267c.257.21.257.736 0 .933z" fillRule="evenodd"></path></svg></span></button>
                                                                <button className="button button--small button--circle button--dark button--withChrome u-baseColor--buttonDark button--withIcon button--withSvgIcon button--scale u-transitionSeries" title="Add an embed" aria-label="Add an embed" data-action="inline-menu-embed" data-action-value="Paste a link to embed content from another site (e.g. Twitter) and press Enter" tabIndex="-1"><span className="svgIcon svgIcon--addMediaEmbed svgIcon--25px"><svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25"><g fillRule="evenodd"><path d="M9.826 7.698l-4.828 4.828 4.828 4.828.652-.7-4.08-4.128L10.53 8.4"></path><path d="M14.514 8.4l4.177 4.126-4.17 4.127.7.7 4.83-4.827-4.83-4.828"></path></g></svg></span></button>
                                                                <button className="button button--small button--circle button--dark button--withChrome u-baseColor--buttonDark button--withIcon button--withSvgIcon button--scale u-transitionSeries" title="Add a new part" aria-label="Add a new part" data-action="inline-menu-hr" tabIndex="-1"><span className="svgIcon svgIcon--addMediaPart svgIcon--25px"><svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25"><g fillRule="evenodd"><path d="M8.45 12H5.3c-.247 0-.45.224-.45.5 0 .274.203.5.45.5h5.4c.247 0 .45-.226.45-.5 0-.276-.203-.5-.45-.5H8.45z"></path><path d="M17.45 12H14.3c-.247 0-.45.224-.45.5 0 .274.203.5.45.5h5.4c.248 0 .45-.226.45-.5 0-.276-.202-.5-.45-.5h-2.25z"></path></g></svg></span></button>
                                                            </div>
                                                        </div>
                                                        <div className="js-tagEditor tagEditor u-hide is-visible">
                                                            <div className="tags tags--postTags tags--postTagsEditor" data-action-scope="_actionscope_29">
                                                                <div className="js-tagInput tags-input editable" id="editor_134" g_editable="true" role="textbox" contentEditable="true" data-default-value="Add a tag…">
                                                                    <p name="d52c" className="graf graf--p"><span className="defaultValue defaultValue--root">Add a tag…</span>
                                                                        <br />
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="inlineEditor-actions">
                                                <div className="u-floatLeft">
                                                    <div className="buttonSet">
                                                        <button className="button button--primary button--withChrome u-accentColor--buttonNormal js-publishButton" data-action="publish">Publish</button>
                                                        <button className="button button--withChrome u-baseColor--buttonNormal js-expandButton" data-action="expand-editor" data-tooltip="Every response is its own story. Expand to the full-screen editor at any time.">Go full screen</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*----------end editor comment-----------*/}
                            {/*----------start comment list-----------*/}
                            <div className="responsesStream js-responsesStream">

                                {/*----------start comment item-----------*/}
                                <div className="streamItem streamItem--postPreview js-streamItem" data-action-scope="_actionscope_6">
                                    <div className="cardChromeless u-marginTop20 u-paddingTop10 u-paddingBottom15 u-paddingLeft20 u-paddingRight20">
                                        <div className="postArticle postArticle--short js-postArticle js-trackedPost" data-post-id="e2d73fd7c130" data-source="responses---------0-31--------------------" data-action-scope="_actionscope_7" data-scroll="native">
                                            <div className="u-marginBottom10">
                                                <div className="postMetaInline">Applause from <a className="link link--darken u-accentColor--textDarken u-baseColor--link" href="https://medium.com/@tashian" data-action="show-user-card" data-action-value="3299ebce81f1" data-action-type="hover" data-user-id="3299ebce81f1" dir="auto">Carl Tashian</a> (author)</div>
                                            </div>
                                            <div className="u-clearfix u-marginBottom15 u-paddingTop5">
                                                <div className="postMetaInline u-floatLeft">
                                                    <div className="u-flexCenter">
                                                        <div className="postMetaInline-avatar u-flex0">
                                                            <a className="link u-baseColor--link avatar" href="https://medium.com/@PeteT2" data-action="show-user-card" data-action-value="f55b78ed1d0c" data-action-type="hover" data-user-id="f55b78ed1d0c" dir="auto">
                                                                <img src="https://cdn-images-1.medium.com/fit/c/27/27/0*XU3Zaq1HvfYBgQ4C.jpg" className="avatar-image u-size36x36 u-xs-size32x32" alt="Go to the profile of Pete Tanski" />
                                                            </a>
                                                        </div>
                                                        <div className="postMetaInline postMetaInline-authorLockup ui-captionStrong u-flex1 u-noWrapWithEllipsis"><a className="ds-link ds-link--styleSubtle link link--darken link--accent u-accentColor--textNormal u-accentColor--textDarken" href="https://medium.com/@PeteT2?source=responses---------0-31--------------------" data-action="show-user-card" data-action-source="responses---------0-31--------------------" data-action-value="f55b78ed1d0c" data-action-type="hover" data-user-id="f55b78ed1d0c" dir="auto">Pete Tanski</a>
                                                            <div className="ui-caption u-fontSize12 u-baseColor--textNormal u-textColorNormal js-postMetaInlineSupplemental">
                                                                <a className="link link--darken" href="https://medium.com/@PeteT2/i-rarely-comment-on-articles-but-i-must-say-when-i-bought-the-whole-taocp-set-i-read-no-e2d73fd7c130?source=responses---------0-31--------------------" data-action="open-post" data-action-value="https://medium.com/@PeteT2/i-rarely-comment-on-articles-but-i-must-say-when-i-bought-the-whole-taocp-set-i-read-no-e2d73fd7c130?source=responses---------0-31--------------------" data-action-source="preview-listing">
                                                                    <time dateTime="2016-04-24T03:06:00.466Z">Apr 24, 2016</time>
                                                                </a><span className="middotDivider u-fontSize12"></span><span className="readingTime" title="1 min read"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="js-inlineExpandBody">
                                                <a className="" href="https://medium.com/@PeteT2/i-rarely-comment-on-articles-but-i-must-say-when-i-bought-the-whole-taocp-set-i-read-no-e2d73fd7c130?source=responses---------0-31--------------------" data-action="expand-inline">
                                                    <div className="postArticle-content js-postField">
                                                        <section className="section section--body section--first section--last">
                                                            <div className="section-divider">
                                                                <hr className="section-divider" />>
                                                            </div>
                                                            <div className="section-content">
                                                                <div className="section-inner sectionLayout--insetColumn">
                                                                    <p name="ba6f" id="ba6f" className="graf graf--p graf--leading graf--trailing">I rarely comment on articles, but I must say: when I bought the whole TAOCP set, I read, no&#8202;—&#8202;reading is passive&#8202;—&#8202;I worked through it, starting with a pencil and paper. Your point that people today can hack without thinking first is spot on, but the constraints of the IBM 650 are irrelevant. They are the same constraints we have today: time and…</p>
                                                                </div>
                                                            </div>
                                                        </section>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="postArticle-readMore">
                                                <button className="button button--smaller button--link u-baseColor--buttonNormal" data-action="expand-inline">Read more…</button>
                                            </div>
                                            <div className="u-clearfix u-paddingTop10">
                                                <div className="u-floatLeft">
                                                    <div className="multirecommend js-actionMultirecommend u-flexCenter" data-post-id="e2d73fd7c130" data-is-flush-left="true" data-source="listing-----e2d73fd7c130---------------------clap_preview">
                                                        <div className="u-relative u-foreground">
                                                            <button className="button button--primary button--chromeless u-accentColor--buttonNormal button--withIcon button--withSvgIcon clapButton js-actionMultirecommendButton" data-action="multivote" data-action-value="e2d73fd7c130" data-action-type="long-press" data-action-source="listing-----e2d73fd7c130---------------------clap_preview" aria-label="Clap"><span className="button-defaultState"><span className="svgIcon svgIcon--clap svgIcon--25px is-flushLeft"><svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25"><g fillRule="evenodd"><path d="M11.739 0l.761 2.966L13.261 0z"></path><path d="M14.815 3.776l1.84-2.551-1.43-.471z"></path><path d="M8.378 1.224l1.84 2.551L9.81.753z"></path><path d="M20.382 21.622c-1.04 1.04-2.115 1.507-3.166 1.608.168-.14.332-.29.492-.45 2.885-2.886 3.456-5.982 1.69-9.211l-1.101-1.937-.955-2.02c-.315-.676-.235-1.185.245-1.556a.836.836 0 0 1 .66-.16c.342.056.66.28.879.605l2.856 5.023c1.179 1.962 1.379 5.119-1.6 8.098m-13.29-.528l-5.02-5.02a1 1 0 0 1 .707-1.701c.255 0 .512.098.707.292l2.607 2.607a.442.442 0 0 0 .624-.624L4.11 14.04l-1.75-1.75a.998.998 0 1 1 1.41-1.413l4.154 4.156a.44.44 0 0 0 .624 0 .44.44 0 0 0 0-.624l-4.152-4.153-1.172-1.171a.998.998 0 0 1 0-1.41 1.018 1.018 0 0 1 1.41 0l1.172 1.17 4.153 4.152a.437.437 0 0 0 .624 0 .442.442 0 0 0 0-.624L6.43 8.222a.988.988 0 0 1-.291-.705.99.99 0 0 1 .29-.706 1 1 0 0 1 1.412 0l6.992 6.993a.443.443 0 0 0 .71-.501l-1.35-2.856c-.315-.676-.235-1.185.246-1.557a.85.85 0 0 1 .66-.16c.342.056.659.28.879.606L18.628 14c1.573 2.876 1.067 5.545-1.544 8.156-1.396 1.397-3.144 1.966-5.063 1.652-1.713-.286-3.463-1.248-4.928-2.714zM10.99 5.976l2.562 2.562c-.497.607-.563 1.414-.155 2.284l.265.562-4.257-4.257a.98.98 0 0 1-.117-.445c0-.267.104-.517.292-.706a1.023 1.023 0 0 1 1.41 0zm8.887 2.06c-.375-.557-.902-.916-1.486-1.011a1.738 1.738 0 0 0-1.342.332c-.376.29-.61.656-.712 1.065a2.1 2.1 0 0 0-1.095-.562 1.776 1.776 0 0 0-.992.128l-2.636-2.636a1.883 1.883 0 0 0-2.658 0 1.862 1.862 0 0 0-.478.847 1.886 1.886 0 0 0-2.671-.012 1.867 1.867 0 0 0-.503.909c-.754-.754-1.992-.754-2.703-.044a1.881 1.881 0 0 0 0 2.658c-.288.12-.605.288-.864.547a1.884 1.884 0 0 0 0 2.659l.624.622a1.879 1.879 0 0 0-.91 3.16l5.019 5.02c1.595 1.594 3.515 2.645 5.408 2.959a7.16 7.16 0 0 0 1.173.098c1.026 0 1.997-.24 2.892-.7.279.04.555.065.828.065 1.53 0 2.969-.628 4.236-1.894 3.338-3.338 3.083-6.928 1.738-9.166l-2.868-5.043z"></path></g></svg></span></span><span className="button-activeState"><span className="svgIcon svgIcon--clapFilled svgIcon--25px is-flushLeft"><svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25"><g fillRule="evenodd"><path d="M11.738 0l.762 2.966L13.262 0z"></path><path d="M16.634 1.224l-1.432-.47-.408 3.022z"></path><path d="M9.79.754l-1.431.47 1.84 2.552z"></path><path d="M22.472 13.307l-3.023-5.32c-.287-.426-.689-.705-1.123-.776a1.16 1.16 0 0 0-.911.221c-.297.231-.474.515-.535.84.017.022.036.04.053.063l2.843 5.001c1.95 3.564 1.328 6.973-1.843 10.144a8.46 8.46 0 0 1-.549.501c1.205-.156 2.328-.737 3.351-1.76 3.268-3.268 3.041-6.749 1.737-8.914"></path><path d="M12.58 9.887c-.156-.83.096-1.569.692-2.142L10.78 5.252c-.5-.504-1.378-.504-1.879 0-.178.18-.273.4-.329.63l4.008 4.005z"></path><path d="M15.812 9.04c-.218-.323-.539-.55-.88-.606a.814.814 0 0 0-.644.153c-.176.137-.713.553-.24 1.566l1.43 3.025a.539.539 0 1 1-.868.612L7.2 6.378a.986.986 0 1 0-1.395 1.395l4.401 4.403a.538.538 0 1 1-.762.762L5.046 8.54 3.802 7.295a.99.99 0 0 0-1.396 0 .981.981 0 0 0 0 1.394L3.647 9.93l4.402 4.403a.537.537 0 0 1 0 .761.535.535 0 0 1-.762 0L2.89 10.696a.992.992 0 0 0-1.399-.003.983.983 0 0 0 0 1.395l1.855 1.854 2.763 2.765a.538.538 0 0 1-.76.761l-2.765-2.764a.982.982 0 0 0-1.395 0 .989.989 0 0 0 0 1.395l5.32 5.32c3.371 3.372 6.64 4.977 10.49 1.126C19.74 19.8 20.271 17 18.62 13.982L15.812 9.04z"></path></g></svg></span></span>
                                                            </button>
                                                        </div><span className="u-textAlignCenter u-relative u-background js-actionMultirecommendCount u-marginLeft5"><button className="button button--chromeless u-baseColor--buttonNormal js-multirecommendCountButton u-disablePointerEvents" data-action="show-recommends" data-action-value="e2d73fd7c130">520</button></span></div>
                                                </div>
                                                <div className="buttonSet u-floatRight"><a className="button button--chromeless u-baseColor--buttonNormal" href="https://medium.com/@PeteT2/i-rarely-comment-on-articles-but-i-must-say-when-i-bought-the-whole-taocp-set-i-read-no-e2d73fd7c130?source=responses---------0-31--------------------#--responses" data-action-source="responses---------0-31--------------------">4 responses</a>
                                                    <button className="button button--chromeless is-touchIconFadeInPulse u-baseColor--buttonNormal button--withIcon button--withSvgIcon button--bookmark js-bookmarkButton" title="Bookmark this story to read later" aria-label="Bookmark this story to read later" data-action="add-to-bookmarks" data-action-value="e2d73fd7c130" data-action-source="listing-----e2d73fd7c130---------------------bookmark_preview"><span className="button-defaultState"><span className="svgIcon svgIcon--bookmark svgIcon--25px"><svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fillRule="evenodd"></path></svg></span></span><span className="button-activeState"><span className="svgIcon svgIcon--bookmarkFilled svgIcon--25px"><svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126c.205.183.52.17.708-.03a.5.5 0 0 0 .118-.285H19V6z"></path></svg></span></span>
                                                    </button>
                                                    <button className="button button--chromeless is-touchIconBlackPulse u-baseColor--buttonNormal button--withIcon button--withSvgIcon js-postActionsButton" data-action="post-actions" data-action-value="e2d73fd7c130"><span className="svgIcon svgIcon--arrowDown svgIcon--19px is-flushRight"><svg className="svgIcon-use" width="19" height="19" viewBox="0 0 19 19"><path d="M3.9 6.772l5.205 5.756.427.472.427-.472 5.155-5.698-.854-.772-4.728 5.254L4.753 6z" fillRule="evenodd"></path></svg></span></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*----------start comment item-----------*/}

                            </div>
                            {/*----------end comment list-----------*/}
                            {/*----------start "show all comment"-----------*/}
                            <div className="container js-showOtherResponses">
                                <div className="row">
                                    <button className="button button--primary button--withChrome u-accentColor--buttonNormal responsesStream-showOtherResponses cardChromeless u-sizeFullWidth u-marginVertical20 u-heightAuto is-touched" data-action="show-other-responses">Show all responses</button>
                                </div>
                            </div>
                            {/*----------end "show all comment"-----------*/}
                            {/*----------start-----------*/}
                            <aside className="u-marginAuto u-maxWidth1000 js-postLeftSidebar">
                                <div className="u-top0 u-sm-hide u-marginLeftNegative12 js-postShareWidget u-fixed u-transition--fadeIn300" data-scroll="fixed" >
                                    <ul>
                                        <li className="u-textAlignCenter u-marginVertical10">
                                            <div className="multirecommend js-actionMultirecommend u-flexColumn u-marginBottom10 u-width60" data-post-id="82e275c8764f" data-is-icon-29px="true" data-is-vertical="true" data-is-circle="true" data-has-recommend-list="true" data-source="post_share_widget-----82e275c8764f---------------------clap_sidebar">
                                                <span className="u-block u-textAlignCenter u-relative u-background js-actionMultirecommendCount u-flexOrderNegative1 u-height20 u-marginBottom7">
                                                    <button className="button button--chromeless u-baseColor--buttonNormal js-multirecommendCountButton u-marginAuto is-touched" data-action="show-recommends" data-action-value="82e275c8764f">
                                                    {articleDetail.claps}
                                                    </button>
                                                </span>
                                                <div className="u-relative u-foreground">
                                                    {/* <button className="is-active  */}
                                                    <button onClick={this.clapArticle} className="button button--large button--circle button--withChrome u-baseColor--buttonNormal button--withIcon button--withSvgIcon clapButton js-actionMultirecommendButton clapButton--largePill u-relative u-foreground u-xs-paddingLeft13 u-width60 u-height60 u-accentColor--textNormal u-accentColor--buttonNormal" data-action="multivote" data-action-value="82e275c8764f" data-action-type="long-press" data-action-source="post_share_widget-----82e275c8764f---------------------clap_sidebar" aria-label="Clap" ><span className="button-defaultState"><span className="svgIcon svgIcon--clap svgIcon--33px u-relative u-topNegative2 u-xs-top0"><svg className="svgIcon-use" width="33" height="33" viewBox="0 0 33 33"><path d="M28.86 17.342l-3.64-6.402c-.292-.433-.712-.729-1.163-.8a1.124 1.124 0 0 0-.889.213c-.63.488-.742 1.181-.33 2.061l1.222 2.587 1.4 2.46c2.234 4.085 1.511 8.007-2.145 11.663-.26.26-.526.49-.797.707 1.42-.084 2.881-.683 4.292-2.094 3.822-3.823 3.565-7.876 2.05-10.395zm-6.252 11.075c3.352-3.35 3.998-6.775 1.978-10.469l-3.378-5.945c-.292-.432-.712-.728-1.163-.8a1.122 1.122 0 0 0-.89.213c-.63.49-.742 1.182-.33 2.061l1.72 3.638a.502.502 0 0 1-.806.568l-8.91-8.91a1.335 1.335 0 0 0-1.887 1.886l5.292 5.292a.5.5 0 0 1-.707.707l-5.292-5.292-1.492-1.492c-.503-.503-1.382-.505-1.887 0a1.337 1.337 0 0 0 0 1.886l1.493 1.492 5.292 5.292a.499.499 0 0 1-.353.854.5.5 0 0 1-.354-.147L5.642 13.96a1.338 1.338 0 0 0-1.887 0 1.338 1.338 0 0 0 0 1.887l2.23 2.228 3.322 3.324a.499.499 0 0 1-.353.853.502.502 0 0 1-.354-.146l-3.323-3.324a1.333 1.333 0 0 0-1.886 0 1.325 1.325 0 0 0-.39.943c0 .356.138.691.39.943l6.396 6.397c3.528 3.53 8.86 5.313 12.821 1.353zM12.73 9.26l5.68 5.68-.49-1.037c-.518-1.107-.426-2.13.224-2.89l-3.303-3.304a1.337 1.337 0 0 0-1.886 0 1.326 1.326 0 0 0-.39.944c0 .217.067.42.165.607zm14.787 19.184c-1.599 1.6-3.417 2.392-5.353 2.392-.349 0-.7-.03-1.058-.082a7.922 7.922 0 0 1-3.667.887c-3.049 0-6.115-1.626-8.359-3.87l-6.396-6.397A2.315 2.315 0 0 1 2 19.724a2.327 2.327 0 0 1 1.923-2.296l-.875-.875a2.339 2.339 0 0 1 0-3.3 2.33 2.33 0 0 1 1.24-.647l-.139-.139c-.91-.91-.91-2.39 0-3.3.884-.884 2.421-.882 3.301 0l.138.14a2.335 2.335 0 0 1 3.948-1.24l.093.092c.091-.423.291-.828.62-1.157a2.336 2.336 0 0 1 3.3 0l3.384 3.386a2.167 2.167 0 0 1 1.271-.173c.534.086 1.03.354 1.441.765.11-.549.415-1.034.911-1.418a2.12 2.12 0 0 1 1.661-.41c.727.117 1.385.565 1.853 1.262l3.652 6.423c1.704 2.832 2.025 7.377-2.205 11.607zM13.217.484l-1.917.882 2.37 2.837-.454-3.719zm8.487.877l-1.928-.86-.44 3.697 2.368-2.837zM16.5 3.293L15.478-.005h2.044L16.5 3.293z" fillRule="evenodd"></path></svg></span></span><span className="button-activeState"><span className="svgIcon svgIcon--clapFilled svgIcon--33px u-relative u-topNegative2 u-xs-top0"><svg className="svgIcon-use" width="33" height="33" viewBox="0 0 33 33"><g fillRule="evenodd"><path d="M29.58 17.1l-3.854-6.78c-.365-.543-.876-.899-1.431-.989a1.491 1.491 0 0 0-1.16.281c-.42.327-.65.736-.7 1.207v.001l3.623 6.367c2.46 4.498 1.67 8.802-2.333 12.807-.265.265-.536.505-.81.728 1.973-.222 3.474-1.286 4.45-2.263 4.166-4.165 3.875-8.6 2.215-11.36zm-4.831.82l-3.581-6.3c-.296-.439-.725-.742-1.183-.815a1.105 1.105 0 0 0-.89.213c-.647.502-.755 1.188-.33 2.098l1.825 3.858a.601.601 0 0 1-.197.747.596.596 0 0 1-.77-.067L10.178 8.21c-.508-.506-1.393-.506-1.901 0a1.335 1.335 0 0 0-.393.95c0 .36.139.698.393.95v.001l5.61 5.61a.599.599 0 1 1-.848.847l-5.606-5.606c-.001 0-.002 0-.003-.002L5.848 9.375a1.349 1.349 0 0 0-1.902 0 1.348 1.348 0 0 0 0 1.901l1.582 1.582 5.61 5.61a.6.6 0 0 1-.848.848l-5.61-5.61c-.51-.508-1.393-.508-1.9 0a1.332 1.332 0 0 0-.394.95c0 .36.139.697.393.952l2.363 2.362c.002.001.002.002.002.003l3.52 3.52a.6.6 0 0 1-.848.847l-3.522-3.523h-.001a1.336 1.336 0 0 0-.95-.393 1.345 1.345 0 0 0-.949 2.295l6.779 6.78c3.715 3.713 9.327 5.598 13.49 1.434 3.527-3.528 4.21-7.13 2.086-11.015zM11.817 7.727c.06-.328.213-.64.466-.893.64-.64 1.755-.64 2.396 0l3.232 3.232c-.82.783-1.09 1.833-.764 2.992l-5.33-5.33z"></path><path d="M13.285.48l-1.916.881 2.37 2.837z"></path><path d="M21.719 1.361L19.79.501l-.44 3.697z"></path><path d="M16.502 3.298L15.481 0h2.043z"></path></g></svg></span></span>
                                                    </button>
                                                    <div className="clapUndo u-width60 u-round u-height32 u-absolute u-borderBox u-paddingRight5 u-transition--transform200Spring u-background--brandSageLighter js-clapUndo" >
                                                        <button className="button button--chromeless u-baseColor--buttonNormal button--withIcon button--withSvgIcon u-floatRight" data-action="multivote-undo" data-action-value="82e275c8764f"><span className="svgIcon svgIcon--removeThin svgIcon--29px"><svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29"><path d="M20.13 8.11l-5.61 5.61-5.609-5.61-.801.801 5.61 5.61-5.61 5.61.801.8 5.61-5.609 5.61 5.61.8-.801-5.609-5.61 5.61-5.61" fillRule="evenodd"></path></svg></span></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="u-textAlignCenter u-marginVertical10">
                                            <button className="button button--large button--dark button--chromeless is-touchIconBlackPulse u-baseColor--buttonDark button--withIcon button--withSvgIcon" title="Share on Twitter" aria-label="Share on Twitter" data-action="share-on-twitter" data-action-source="post_share_widget"><span className="svgIcon svgIcon--twitter svgIcon--29px"><svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29"><path d="M21.967 11.8c.018 5.93-4.607 11.18-11.177 11.18-2.172 0-4.25-.62-6.047-1.76l-.268.422-.038.5.186.013.168.012c.3.02.44.032.6.046 2.06-.026 3.95-.686 5.49-1.86l1.12-.85-1.4-.048c-1.57-.055-2.92-1.08-3.36-2.51l-.48.146-.05.5c.22.03.48.05.75.08.48-.02.87-.07 1.25-.15l2.33-.49-2.32-.49c-1.68-.35-2.91-1.83-2.91-3.55 0-.05 0-.01-.01.03l-.49-.1-.25.44c.63.36 1.35.57 2.07.58l1.7.04L7.4 13c-.978-.662-1.59-1.79-1.618-3.047a4.08 4.08 0 0 1 .524-1.8l-.825.07a12.188 12.188 0 0 0 8.81 4.515l.59.033-.06-.59v-.02c-.05-.43-.06-.63-.06-.87a3.617 3.617 0 0 1 6.27-2.45l.2.21.28-.06c1.01-.22 1.94-.59 2.73-1.09l-.75-.56c-.1.36-.04.89.12 1.36.23.68.58 1.13 1.17.85l-.21-.45-.42-.27c-.52.8-1.17 1.48-1.92 2L22 11l.016.28c.013.2.014.35 0 .52v.04zm.998.038c.018-.22.017-.417 0-.66l-.498.034.284.41a8.183 8.183 0 0 0 2.2-2.267l.97-1.48-1.6.755c.17-.08.3-.02.34.03a.914.914 0 0 1-.13-.292c-.1-.297-.13-.64-.1-.766l.36-1.254-1.1.695c-.69.438-1.51.764-2.41.963l.48.15a4.574 4.574 0 0 0-3.38-1.484 4.616 4.616 0 0 0-4.61 4.613c0 .29.02.51.08.984l.01.02.5-.06.03-.5c-3.17-.18-6.1-1.7-8.08-4.15l-.48-.56-.36.64c-.39.69-.62 1.48-.65 2.28.04 1.61.81 3.04 2.06 3.88l.3-.92c-.55-.02-1.11-.17-1.6-.45l-.59-.34-.14.67c-.02.08-.02.16 0 .24-.01 2.12 1.55 4.01 3.69 4.46l.1-.49-.1-.49c-.33.07-.67.12-1.03.14-.18-.02-.43-.05-.64-.07l-.76-.09.23.73c.57 1.84 2.29 3.14 4.28 3.21l-.28-.89a8.252 8.252 0 0 1-4.85 1.66c-.12-.01-.26-.02-.56-.05l-.17-.01-.18-.01L2.53 21l1.694 1.07a12.233 12.233 0 0 0 6.58 1.917c7.156 0 12.2-5.73 12.18-12.18l-.002.04z"></path></svg></span></button>
                                        </li>
                                        <li className="u-textAlignCenter u-marginVertical10">
                                            <button className="button button--large button--dark button--chromeless is-touchIconBlackPulse u-baseColor--buttonDark button--withIcon button--withSvgIcon" title="Share on Facebook" aria-label="Share on Facebook" data-action="share-on-facebook" data-action-source="post_share_widget"><span className="svgIcon svgIcon--facebook svgIcon--29px"><svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29"><path d="M16.39 23.61v-5.808h1.846a.55.55 0 0 0 .546-.48l.36-2.797a.551.551 0 0 0-.547-.62H16.39V12.67c0-.67.12-.813.828-.813h1.474a.55.55 0 0 0 .55-.55V8.803a.55.55 0 0 0-.477-.545c-.436-.06-1.36-.116-2.22-.116-2.5 0-4.13 1.62-4.13 4.248v1.513H10.56a.551.551 0 0 0-.55.55v2.797c0 .304.248.55.55.55h1.855v5.76c-4.172-.96-7.215-4.7-7.215-9.1 0-5.17 4.17-9.36 9.31-9.36 5.14 0 9.31 4.19 9.31 9.36 0 4.48-3.155 8.27-7.43 9.15M14.51 4C8.76 4 4.1 8.684 4.1 14.46c0 5.162 3.75 9.523 8.778 10.32a.55.55 0 0 0 .637-.543v-6.985a.551.551 0 0 0-.55-.55H11.11v-1.697h1.855a.55.55 0 0 0 .55-.55v-2.063c0-2.02 1.136-3.148 3.03-3.148.567 0 1.156.027 1.597.06v1.453h-.924c-1.363 0-1.93.675-1.93 1.912v1.78c0 .3.247.55.55.55h2.132l-.218 1.69H15.84c-.305 0-.55.24-.55.55v7.02c0 .33.293.59.623.54 5.135-.7 9.007-5.11 9.007-10.36C24.92 8.68 20.26 4 14.51 4"></path></svg></span></button>
                                        </li>
                                        <li className="u-textAlignCenter u-marginVertical10">
                                            <button className="button button--large button--dark button--chromeless is-touchIconFadeInPulse u-baseColor--buttonDark button--withIcon button--withSvgIcon button--bookmark js-bookmarkButton" title="Bookmark this story to read later" aria-label="Bookmark this story to read later" data-action="add-to-bookmarks" data-action-value="82e275c8764f" data-action-source="post_share_widget-----82e275c8764f---------------------bookmark_sidebar"><span className="button-defaultState"><span className="svgIcon svgIcon--bookmark svgIcon--29px"><svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29"><path d="M19.385 4h-9.77A2.623 2.623 0 0 0 7 6.615V23.01a1.022 1.022 0 0 0 1.595.847l5.905-4.004 5.905 4.004A1.022 1.022 0 0 0 22 23.011V6.62A2.625 2.625 0 0 0 19.385 4zM21 23l-5.91-3.955-.148-.107a.751.751 0 0 0-.884 0l-.147.107L8 23V6.615C8 5.725 8.725 5 9.615 5h9.77C20.275 5 21 5.725 21 6.615V23z" fillRule="evenodd"></path></svg></span></span><span className="button-activeState"><span className="svgIcon svgIcon--bookmarkFilled svgIcon--29px"><svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29"><path d="M19.385 4h-9.77A2.623 2.623 0 0 0 7 6.615V23.01a1.022 1.022 0 0 0 1.595.847l5.905-4.004 5.905 4.004A1.022 1.022 0 0 0 22 23.011V6.62A2.625 2.625 0 0 0 19.385 4z" fillRule="evenodd"></path></svg></span></span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                            {/*----------end-----------*/}
                        </div>
                    </div>
                </footer>
            </article>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return ({
        getArticleDetail: id => dispatch(getArticleDetail(id)),
        clapArticle: id => dispatch(clapArticle(id))
    });
}

const mapStateToProps = (state) =>({
    articleDetail: state.home.articleDetail,
    common : state.common,
    user : state.authUser.user
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);