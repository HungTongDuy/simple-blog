import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';
import { Form } from '../../components/Article';
import { HOME_PAGE_LOADED, DELETE_ARTICLE, SET_EDIT, HOST, PORT } from '../../../constants';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Icon from '@material-ui/core/Icon';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentWillMount() {
        const { onLoad } = this.props;
        
        axios.get(`http://${HOST}:${PORT}/api/articles/`)
        .then((res) => {
            console.log('res.data', res.data);
            onLoad(res.data)
        });
    }

    handleDelete(id) {
        const { onDelete } = this.props;

        return axios.delete(`http://${HOST}:${PORT}/api/articles/${id}`)
        .then(() => onDelete(id));
    }

    handleEdit(id) {
        const { setEdit } = this.props;

        setEdit(id);
    }

    render() {
        let { articles } = this.props;
        console.log('articles', this.props);
        return (
            <div className="container">
                <div className="row pt-5">
                    <div className="col-12 col-lg-6 offset-lg-3">
                        { articles == undefined ? '' :
                            articles.map((article) => {
                            return (
                                <div className="card my-3">
                                    <div className="card-header">
                                        {article.title}
                                    </div>
                                    <div className="card-body">
                                        {article.body}
                                        <p className="mt-5 text-muted"><b>{article.author}</b> {moment(new Date(article.createdAt)).fromNow()}</p>
                                    </div>
                                    <div className="card-footer">
                                        <div className="row">
                                            {/* <button onClick={() => this.handleEdit(article)} className="btn btn-primary mx-3">
                                                Edit
                                            </button>
                                            <button onClick={() => this.handleDelete(article._id)} className="btn btn-danger">
                                                Delete
                                            </button> */}
                                            <Button onClick={() => this.handleEdit(article)} variant="contained" color="primary">
                                                Edit
                                            </Button>
                                            <Button onClick={() => this.handleDelete(article._id)} variant="contained" color="secondary">
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="col-12 col-lg-6 offset-lg-3">
                        <h1 className="text-center">LightBlog</h1>
                    </div>
                    <Form />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    articles: state.home.articles
});

const mapDispatchToProps = (dispatch) => ({
    onLoad: (data) => dispatch({ type: HOME_PAGE_LOADED, data }),
    onDelete: (id) => dispatch({ type: DELETE_ARTICLE, id }),
    setEdit: (id) => dispatch({ type: SET_EDIT, id})
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);