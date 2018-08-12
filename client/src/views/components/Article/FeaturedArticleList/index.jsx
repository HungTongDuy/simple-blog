import React from 'react';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import { 
    ROUTE_ARTICLE_VIEW
} from '../../../../core/constants'; 

class FeaturedArticleList extends React.Component {

    constructor(props) {
        super(props);

        this.xoa_dau = this.xoa_dau.bind(this);
    }

    xoa_dau(str) {
        if(str != undefined || str != '') {
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
        }
        return str;
    }

    render() {
        let numberOfItemDisplay = 4;
        let articles = this.props.articles;
        console.log('articles', articles);
        if ((articles != undefined) || (articles != null)) {
            articles = articles.slice(0, numberOfItemDisplay);
            return (
                <div>               
                    <Grid item className="extremeHero-largeCard js-trackedPost" xs={7}>
                        <div className="extremeHero-post">
                            <Link className="link" to={ROUTE_ARTICLE_VIEW + this.xoa_dau(articles[0].title) + '-' + articles[0]._id }><img src={articles[0].feature_img} title={articles[0].title} /></Link>
                            <div className="extremeHero-postContent">
                                <div className="extremeHero-titleClamp">
                                    <h3 className="title"><Link className="link" to={ROUTE_ARTICLE_VIEW + this.xoa_dau(articles[0].title) + '-' + articles[0]._id }>{articles[0].title}</Link></h3>
                                    <div className="content">
                                        {articles[0].text.substr(0, 80) + '...'}
                                    </div>
                                </div>
                                <div className="extremeHero-byline">
                                    <p><b>{articles[0].author.name}</b> </p>
                                    <p>{moment(new Date(articles[0].createdAt)).fromNow()}</p>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item className="extremeHero-smallCardContainer" xs={5}>
                        {articles.map((article, key) => {
                            if(key != 0) {
                                return (
                                    <div className="card streamItem" key={key}>
                                        <div className="extremePostPreview">
                                            <Grid item className="extremeHero-image" xs={4}>
                                                <Link className="link" to={ROUTE_ARTICLE_VIEW + this.xoa_dau(article.title) + '-' + article._id }>
                                                    <img src={article.feature_img} title={article.title}/>                                                
                                                </Link>
                                            </Grid>
                                            <Grid item className="extremeHero-postContent" xs={8}>
                                                <div className="extremeHero-titleClamp">
                                                    <h3 className="title">
                                                        <Link className="link" to={ROUTE_ARTICLE_VIEW + this.xoa_dau(article.title) + '-' + article._id }>
                                                            {article.title}                                            
                                                        </Link>
                                                    </h3>
                                                </div>
                                                <div className="extremeHero-content">
                                                    {article.text.substr(0, 50) + ' ...'}
                                                    <p className="mt-5 text-muted">{article.author.name}</p>
                                                    <p>{moment(new Date(article.createdAt)).fromNow()}</p>
                                                </div>
                                            </Grid>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </Grid>

                </div>
            );
        } else {
            return(
                <div>
                </div>
            );
        }
        
    }
}

export default FeaturedArticleList;