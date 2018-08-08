import React from 'react';
import { connect } from 'react-redux';

import './AddArticle.css';

import { SUBMIT_ARTICLE, EDIT_ARTICLE } from '../../../../core/constants';

import { onLoadProgress, onSubmitPublish, toggleDialogOpen } from '../../../../core/actions';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

const config = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false
}

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSubmitSuccess: false,
            title: '',
            text: '',
            description: '',
            imgSrc: null,
            loading: false
        }

        // this.handleSubmit = this.handleSubmit.bind(this);
        this.onClickClose = this.onClickClose.bind(this);
        this.updateContent = this.updateContent.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.previewImg = this.previewImg.bind(this);
        this.publishStory = this.publishStory.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
    }

    // handleSubmit() {
    //     const { title, body, author } = this.state;
    //     const { onSubmit, articleToEdit, onEdit } = this.props;

    //     if(!articleToEdit) {
    //         return axios.post(API_ARTICLE_URL, { title, body, author })
    //         .then((res) => {
    //             console.log('response', res);
    //             if (res.status == 200) {
    //                 this.setState({
    //                     isSubmitSuccess: true
    //                 });
    //                 $('#exampleModalCenter').modal('show');
    //             }
    //             onSubmit(res.data);
    //         })
    //         .then(() => this.setState({ title: '', body: '', author: '' }));
    //     } else {
    //         return axios.patch(API_ARTICLE_URL + articleToEdit._id, { title, body, author })
    //         .then((res) => onEdit(res.data))
    //         .then(() => this.setState({ title: '', body: '', author: '' }));
    //     }
    // }

    handleModelChange(model) {
        console.log('handleModelChange', model);
        this.setState({
            text: model,
            description: `${model.substring(0,30).toString()}...`
        });
    }

    onClickClose() {
        this.setState({
            isSubmitSuccess: false
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.articleToEdit) {
            this.setState({
                title: nextProps.articleToEdit.title,
                body: nextProps.articleToEdit.body,
                author: nextProps.articleToEdit.author
            });
        }
    }

    updateContent(newContent) {
        this.setState({
            content: newContent
        })
    }
    
    onChange(evt){
        console.log("onChange fired with event info: ", evt);
        var newContent = evt.editor.getData();
        this.setState({
            content: newContent
        })
    }
    
    onBlur(evt){
        console.log("onBlur event called with event info: ", evt);
    }
    
    afterPaste(evt){
        console.log("afterPaste event called with event info: ", evt);
    }

    previewImg () {
        const file = this.refs.fileUploader.files[0]
        var reader = new FileReader()
        reader.onload = function (e) {
            document.getElementById('image_preview').src = e.target.result
            this.setState({
                imgSrc: file/*e.target.result*/
            })
        }.bind(this)
        reader.readAsDataURL(file)
    }

    handleClick () {
        this.refs.fileUploader.click()
    }

    publishStory () {
        if(localStorage.Auth) {
            this.props.onLoadProgress(true);
            let formdata = {
                text: this.state.text,
                image: this.state.imgSrc,
                title: this.state.title,
                author_id: JSON.parse(localStorage.Auth)._id,
                description: this.state.description,
                claps: 0
            }
            console.log('formdata', formdata);
            this.props.onSubmitPublish(formdata);
        } else {
            console.log('publishStory-false');
            this.props.toggleDialogOpen({ signIn: false, signUp: true });
        }
    }

    handleChangeTitle(e) {
        console.log('handleChangeTitle', e.target.value);
        this.setState({
            title: e.target.value
        });
    }

    render() {
        const { title, body, author, isSubmitSuccess } = this.state;

        return (
            <CardContent className="add-article-component">
                <Grid container spacing={24} item xs={8} sm={8} className="editor-article-container">
                    <Grid item xs={12} sm={12}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                id="with-placeholder"
                                label="Title"
                                placeholder="Title"
                                className="textField"
                                margin="normal"
                                onChange={this.handleChangeTitle}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FroalaEditor 
                                tag='textarea'
                                config={config}
                                onModelChange={this.handleModelChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div className="hidden">
                                <input type="file" onChange={ ()=>this.previewImg()} id="file" ref="fileUploader"/>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <span className="picture_upload">
                                <i className="fa fa-camera" onClick={this.handleClick}></i>
                            </span>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div className={this.state.imgSrc != null ? 'file-upload-previewer' : 'file-upload-previewer hidden'}>
                                <img src="" alt="" id="image_preview"/>
                            </div>
                            <div className="existing-img-previewer" id="existing-img-previewer">
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Button 
                            onClick={this.publishStory} 
                            variant="contained" 
                            className="btn btn-primary float-right publish-button" 
                            color="primary" >
                            Publish
                        </Button>
                        { !this.props.loadingPublish ? '' :
                            <LinearProgress className="progress-public green-border-button" />
                        }
                    </Grid>
                </Grid>

                <div className="col-12 col-lg-6 offset-lg-3">
                    { !isSubmitSuccess ? '' : 
                        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        Add article success.
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.onClickClose}>Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </CardContent>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    onSubmit: data => dispatch({ type: SUBMIT_ARTICLE, data }),
    onEdit: data => dispatch({ type: EDIT_ARTICLE, data }),
    onLoadProgress: data => dispatch(onLoadProgress(data)),
    onSubmitPublish: data => dispatch(onSubmitPublish(data)),
    toggleDialogOpen: data => dispatch(toggleDialogOpen(data))
});

const mapStateToProps = state => ({
    articleToEdit: state.home.articleToEdit,
    loadingPublish: state.common.loadingPublish
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);