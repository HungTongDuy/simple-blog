import React, { NewLifecycle } from 'react';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import { 
    ROUTE_ARTICLE_VIEW
} from '../../../../core/constants'; 

class NewArticleList extends React.Component {

    constructor(props) {
        super(props);

        this.xoa_dau = this.xoa_dau.bind(this);
    }

    xoa_dau(str) {
        console.log('xoa-dau', str);
        if(str != undefined && str != '') {
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            str = str.replace(/đ/g, "d");
            str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
            str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
            str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
            str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
            str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
            str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
            str = str.replace(/Đ/g, "D");
            str = str.replace(/\s+/g, '-');
            str.trim();
            str.toLowerCase();
        }
        return str;
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
                                        <h3 className="title"><Link className="link" to={ROUTE_ARTICLE_VIEW + this.xoa_dau(article.title) + '-' + article._id }>{article.title}</Link></h3>
                                    </div>
                                    <div className="card-body">
                                        {article.text.substr(0, 80) + '...'}
                                        <p className="mt-5 text-muted"><b>{article.author.name}</b> {moment(new Date(article.createdAt)).fromNow()}</p>
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
                                    <Link className="link" to={ROUTE_ARTICLE_VIEW + this.xoa_dau(article.title) + '-' + article._id }>
                                        <img src={article.feature_img} title={article.title} />
                                    </Link>
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