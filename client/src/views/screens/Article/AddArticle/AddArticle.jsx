import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import './AddArticle.css';
import $ from 'jquery';

import { 
    SUBMIT_ARTICLE, 
    EDIT_ARTICLE,
    SUCCESS,
    ERROR
} from '../../../../core/constants';

import { onLoadProgress, onSubmitPublish, toggleDialogOpen } from '../../../../core/actions';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';
import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';


import { EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


import ReactQuill, { Quill } from 'react-quill'; // ES6
//import quillEmoji from 'quill-emoji';
//quillEmoji(Quill);
// import * as ReactQuill from 'react-quill'; // Typescript
// const ReactQuill = require('react-quill');
import 'react-quill/dist/quill.snow.css'; // ES6


import SnackbarNotification from '../../../components/SnackbarNotification';

const config = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false
}


class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            text: '',
            description: '',
            imgSrc: null,
            loading: false,
            editorState: '',
            contentState: {},
            textQuill: ''
        }

        // this.handleSubmit = this.handleSubmit.bind(this);
        this.updateContent = this.updateContent.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.previewImg = this.previewImg.bind(this);
        this.publishStory = this.publishStory.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);

        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.onContentStateChange = this.onContentStateChange.bind(this);

        this.handleChangeQuill = this.handleChangeQuill.bind(this);
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

    // onClickClose() {
    //     this.setState({
    //         isSubmitSuccess: false
    //     });
    // }

    handleModelChange(model) {
        console.log('handleModelChange', model);
        this.setState({
            text: model,
            description: `${model.substring(0,30).toString()}...`
        });
    }

    onEditorStateChange(text) {
        console.log('onEditorStateChange', text);
        this.setState({
            editorState : text
        })
    }

    onContentStateChange(contentState) {
        this.setState({
          contentState : contentState
        })
    };

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
            // let formdata = {
            //     text: this.state.text,
            //     image: this.state.imgSrc,
            //     title: this.state.title,
            //     author_id: JSON.parse(localStorage.Auth)._id,
            //     description: this.state.description,
            //     claps: 0
            // }
            const formdata = new FormData()
            formdata.append('text', this.state.text)
            formdata.append('image', this.state.imgSrc)
            formdata.append('title', this.state.title)
            formdata.append('author_id', JSON.parse(localStorage.Auth)._id)
            formdata.append('description', this.state.description)
            formdata.append('claps', 0)
            console.log('formdata', formdata);
            // axios.post('http://localhost:8000/api/articles/', formdata).then((res) => {
            //     console.log('res--', res);
            // })
            this.props.onSubmitPublish(formdata);
        } else {
            console.log('publishStory-false');
            this.props.toggleDialogOpen({ signIn: false, signUp: true });
        }
    }

    handleChangeTitle(e) {
        console.log('handleChangeTitle', document.getElementById('title-article').value);
        const el = findDOMNode(this.refs.refTitle);
        console.log('jquery---', $(el).value);
        this.setState({
            title: e.target.value
        });
    }

    handleChangeQuill(val) {
        this.setState({
            textQuill: val
        })
    }

    render() {
        console.log('state-addArticle: ', this.state);
        const common = this.props;

        const options=  {
            placeholder: "Edit Me",
            events : {
                'froalaEditor.focus' : function(e, editor) {
                    console.log('froalaEditor.focus: ', editor.selection.get());
                },
                'froalaEditor.image.loaded' : function (e, editor, $img) {
                    console.log('froalaEditor.image.loaded', $img);
                },
                'froalaEditor.image.inserted' : function (e, editor, $img, res) {
                    console.log('froalaEditor.image.inserted', $img + '-' + res);
                },
                'froalaEditor.image.beforeUpload' : function (e, editor, images) {
                    console.log('froalaEditor.image.beforeUpload', images);
                },
            }
        }

        // const config = {
        //     toolbarButtons: ['undo', 'redo', 'clearFormatting', 'selectAll', 'html', 'insertInputField']
        // }

        return (
            <CardContent className="add-article-component">
                <Grid container spacing={24} item xs={8} sm={8} className="editor-article-container">
                    <Grid item xs={12} sm={12}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Title"
                                placeholder="Title"
                                className="textField"
                                id="title-article"
                                //ref="refTitle"
                                margin="normal"
                                onChange={this.handleChangeTitle}
                            />
                            {/* <FroalaEditorView
                                model={this.state.text}
                            /> */}
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FroalaEditor 
                                id="editor"
                                tag='textarea'
                                config={config}
                                //model={this.state.model}
                                onModelChange={this.handleModelChange}
                                options={options}
                            />

                            {/* <Editor
                                editorState={this.state.editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                //onEditorStateChange={this.onEditorStateChange}
                                onContentStateChange={this.onContentStateChange}
                                //toolbar={toolbar}
                            /> */}
                            {/* <CustomToolbar /> */}
                            <ReactQuill 
                                value={this.state.textQuill}
                                onChange={this.handleChangeQuill}
                                modules={Form.modules}
                                formats={Form.formats}
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
                        { !common.loadingPublish ? '' :
                            <LinearProgress className="progress-public green-border-button" />
                        }
                    </Grid>
                </Grid>
                <SnackbarNotification />
            </CardContent>
        )
    }
}
var toolbarOptions = {
    container: [
        ['bold', 'italic', 'underline', 'strike'],     // toggled buttons
        ['blockquote', 'code-block'],
        [{ 'align': ['','center','right','justify'] }],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': ['serif','monospace'] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        ['link','image','video'],
        ['clean']                                         // remove formatting button
    ],
    handlers: {'emoji': function() {}}
}

Form.modules = {
    toolbar: toolbarOptions,
    //toolbar_emoji: true,
    clipboard: {
        matchVisual: false,
    },
    imageDrop: true,
    imageResize: {}
};
// Editor.modules = {
//     toolbar: {
//       container: "#toolbar",
//       handlers: {
//         insertStar: insertStar
//       }
//     },
//     clipboard: {
//       matchVisual: false,
//     }
//   };
Form.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "imagewithstyle",
    "color",
    "video",
    "width"
];

const CustomButton = () => <span className="octicon octicon-star" />;

function insertStar () {
    const cursorPosition = this.quill.getSelection().index
    this.quill.insertText(cursorPosition, "★")
    this.quill.setSelection(cursorPosition + 1)
}

const CustomToolbar = () => (
    <div id="toolbar">
      <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
        <option value="1" />
        <option value="2" />
        <option selected />
      </select>
      <button className="ql-bold" />
      <button className="ql-italic" />
      <select className="ql-color">
        <option value="red" />
        <option value="green" />
        <option value="blue" />
        <option value="orange" />
        <option value="violet" />
        <option value="#d0d1d2" />
        <option selected />
      </select>
      <button className="ql-insertStar">
        <CustomButton />
      </button>
      <span className="ql-formats"><button type="button" className="ql-bold"><svg viewBox="0 0 18 18"> <path className="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"></path> <path className="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"></path> </svg></button><button type="button" className="ql-italic"><svg viewBox="0 0 18 18"> <line className="ql-stroke" x1="7" x2="13" y1="4" y2="4"></line> <line className="ql-stroke" x1="5" x2="11" y1="14" y2="14"></line> <line className="ql-stroke" x1="8" x2="10" y1="14" y2="4"></line> </svg></button><button type="button" className="ql-underline"><svg viewBox="0 0 18 18"> <path className="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"></path> <rect className="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"></rect> </svg></button><button type="button" className="ql-strike"><svg viewBox="0 0 18 18"> <line className="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"></line> <path className="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"></path> <path className="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"></path> </svg></button></span>


    </div>
);


const mapDispatchToProps = (dispatch) => ({
    onSubmit: data => dispatch({ type: SUBMIT_ARTICLE, data }),
    onEdit: data => dispatch({ type: EDIT_ARTICLE, data }),
    onLoadProgress: data => dispatch(onLoadProgress(data)),
    onSubmitPublish: data => dispatch(onSubmitPublish(data)),
    toggleDialogOpen: data => dispatch(toggleDialogOpen(data))
});

const mapStateToProps = state => ({
    articleToEdit: state.home.articleToEdit,
    common: state.common
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);