import React, { NewLifecycle } from 'react';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

class FeaturedArticleList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let numberOfItemDisplay = 4;
        let articles = this.props.articles;
        if ((articles != undefined) || (articles != null)) {
            articles = articles.slice(0, numberOfItemDisplay);
            return (
                <div>               
                    <Grid item className="extremeHero-largeCard js-trackedPost" xs={8}>
                        <div className="extremeHero-post">
                            <img src="https://cdn-images-1.medium.com/max/1400/0*5Ydk4DROjj7bNVOB" />
                            <div className="extremeHero-postContent">
                                <div className="extremeHero-titleClamp">
                                    <h3 className="title">{articles[0].title}</h3>
                                    <div className="content">
                                        {articles[0].body}  
                                    </div>
                                </div>
                                <div className="extremeHero-byline">
                                    <p><b>{articles[0].author}</b> </p>
                                    <p>{moment(new Date(articles[0].createdAt)).fromNow()}</p>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item className="extremeHero-smallCardContainer" xs={4}>
                        {articles.map((article, key) => {
                            if(key != 0) {
                                return (
                                    <Card className="card streamItem" key={key}>
                                        <CardContent className="extremePostPreview">
                                            <Grid item className="extremeHero-image" xs={4}>
                                                <img src="https://cdn-images-1.medium.com/fit/c/152/156/0*2mHsgB-JH_yxlRev.png" />
                                            </Grid>
                                            <Grid item className="extremeHero-postContent" xs={8}>
                                                <div >
                                                    <h3 className="title">{article.title}</h3>
                                                </div>
                                                <div className="card-body">
                                                    {article.body}
                                                    <p className="mt-5 text-muted"><b>{article.author}</b> {moment(new Date(article.createdAt)).fromNow()}</p>
                                                </div>
                                                <div className="card-footer">
                                                    <div className="row">
                        
                                                    </div>
                                                </div>
                                            </Grid>
                                        </CardContent>
                                    </Card>
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