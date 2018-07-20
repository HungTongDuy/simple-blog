import React, { NewLifecycle } from 'react';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

class NewArticleList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let articles = this.props.articles;
        return (
            <div>
            { articles == undefined ? '' : 
                articles.map((article, key) => {
                    return (
                        <Card className="card streamItem" key={key}>
                            <CardContent className="extremePostPreview">
                                <Grid item className="extremePostPreview-post" xs={8}>
                                    <div className="card-header">
                                        <h3 className="title">{article.title}</h3>
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
                                            {/* <Button onClick={() => this.handleEdit(article)} variant="contained" color="primary">
                                                Edit
                                            </Button>
                                            <Button onClick={() => this.handleDelete(article._id)} variant="contained" color="secondary">
                                                Delete
                                            </Button> */}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item className="extremePostPreview-image" xs={4}>
                                    <img src="https://cdn-images-1.medium.com/fit/c/152/156/0*2mHsgB-JH_yxlRev.png" />
                                </Grid>
                            </CardContent>
                        </Card>
                    );
                })
            }
            </div>
        );
    }
}

export default NewArticleList;