import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { SUBMIT_ARTICLE, EDIT_ARTICLE, HOST, PORT } from '../../../../constants';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            author: '',
            isSubmitSuccess: false
        }

        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onClickClose = this.onClickClose.bind(this);
    }

    handleSubmit() {
        const { title, body, author } = this.state;
        const { onSubmit, articleToEdit, onEdit } = this.props;

        if(!articleToEdit) {
            return axios.post(`http://${HOST}:${PORT}/api/articles/`, { title, body, author })
            .then((res) => {
                console.log('response', res);
                if (res.status == 200) {
                    this.setState({
                        isSubmitSuccess: true
                    });
                    $('#exampleModalCenter').modal('show');
                }
                onSubmit(res.data);
            })
            .then(() => this.setState({ title: '', body: '', author: '' }));
        } else {
            return axios.patch(`http://${HOST}:${PORT}/api/articles/${articleToEdit._id}`, { title, body, author })
            .then((res) => onEdit(res.data))
            .then(() => this.setState({ title: '', body: '', author: '' }));
        }
    }

    handleChangeField(key, event) {
        this.setState({
            [key]: event.target.value
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

    render() {
        const { title, body, author, isSubmitSuccess } = this.state;
        const { articleToEdit } = this.props;
        console.log('isSubmitSuccess', isSubmitSuccess);
        return (
            <div>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                    <Grid item xs={12} sm={6}>
                        <Input
                            placeholder="Article Title"
                            inputProps={{
                                'aria-label': 'Description',
                            }}
                            onChange={(e) => this.handleChangeField('title', e)}
                            value={title}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            placeholder="Article Description"
                            onChange={(e) => this.handleChangeField('body', e)}
                            value={body}
                            multiLine={true}
                            rows={8}
                            rowsMax={40}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input
                            inputProps={{
                                'aria-label': 'Description',
                            }}
                            placeholder="Article Author"
                            onChange={(e) => this.handleChangeField('author', e)}
                            value={author}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <div className="col-12 col-lg-6 offset-lg-3">
                {/* <Input
                    placeholder="Article Title"
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                    onChange={(e) => this.handleChangeField('title', e)}
                    value={title}
                />
                <TextField 
                    placeholder="Article Description"
                    onChange={(e) => this.handleChangeField('body', e)}
                    value={body}
                    multiLine={true}
                    rows={8}
                    rowsMax={40}
                />
                <Input
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                    placeholder="Article Author"
                    onChange={(e) => this.handleChangeField('author', e)}
                    value={author}
                /> */}
                <button onClick={this.handleSubmit} className="btn btn-primary float-right">Submit</button>
                
                { !isSubmitSuccess ? '' : 
                    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    {/* <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5> */}
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
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    onSubmit: data => dispatch({ type: SUBMIT_ARTICLE, data }),
    onEdit: data => dispatch({ type: EDIT_ARTICLE, data })
});

const mapStateToProps = state => ({
    articleToEdit: state.home.articleToEdit
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);