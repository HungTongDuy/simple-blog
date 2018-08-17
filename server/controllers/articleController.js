const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const Counter = mongoose.model('Counter');
const fs = require('fs');
const cloudinary = require('cloudinary');
module.exports = {
    addArticle: (req, res, next) => {
        console.log('req.body', req.body);
        console.log('req.files', req.files);
        let { text, title, claps, description } = req.body;
        let articleId = 3; //getNextSequence('articleId');
        if (req.files != undefined && req.files.image) {
        //if(req.files.image) {
            console.log('req.files.image', req.files.image);
            cloudinary.uploader.upload(req.files.image.path, (result) => {
                console.log('cloudinary.uploader.result: ', result);
                let obj = { articleId, text, title, claps, description, feature_img: result.url != null ? result.url : '' }
                saveArticle(obj)
            },{
                resource_type: 'image',
                eager: [
                    {effect: 'sepia'}
                ]
            })
        } else {
            saveArticle({ articleId, text, title, claps, description, feature_img: '' })
        }
        function saveArticle(obj) {
            new Article(obj).save((err, article) => {
                if (err)
                    res.send(err)
                else if (!article)
                    res.send(400)
                else {
                    return article.addAuthor(req.body.author_id).then((_article) => {
                        return res.send(_article)
                    })
                }
                next()
            })
        }
        function getNextSequence(sequenceName) {
            var sequenceDocument = Counter.findOneAndUpdate({
                query : { "_id" : sequenceName },
                update : { $inc : { "sequence_value" : 1 }},
                new:true
            });
            console.log('sequenceDocument.sequence_value', sequenceDocument.sequence_value);
            return sequenceDocument.sequence_value;

            // Counter.findOneAndUpdate( { _id: name }, null, { $inc: { sequence_value: 1 } }, function(err, result){
            //     //if(err) callback(err, result);
            //     //callback(err, result.value.sequence_value);
            //     if (err) { 
            //         throw err;
            //     }
            //     else { 
            //         console.log("updated!");
            //     }
            // } );
        }
    },
    getAll: (req, res, next) => {
        console.log('getAll', req.params.id);
        Article.find(req.params.id)
        .populate('author')
        .populate('comments.author').exec((err, article)=> {
            if (err) {
                res.send(err)
            } else if (!article) {
                console.log('res 404');
                res.send(404)
            } else {
                console.log('res.send(article)', article);
                res.send(article)
            }
            next()            
        })
    },
    /**
     * article_id
     */
    clapArticle: (req, res, next) => {
        Article.findById(req.body.article_id).then((article)=> {
            return article.clap().then(()=>{
                return res.json({msg: "Done"})
            })
        }).catch(next)
    },
    /**
     * comment, author_id, article_id
     */
    commentArticle: (req, res, next) => {
        Article.findById(req.body.article_id).then((article)=> {
            let date = new Date()
            return article.comment({
                author: req.body.author_id,
                text: req.body.comment,
                createdAt: date.toISOString(),
                claps: 0,
                // name: req.body.name
            }).then(() => {
                return res.json({msg: "Done"})
            })
        }).catch(next)
    },
    /**
     * article_id
     */
    getArticle: (req, res, next) => {
        Article.findById(req.params.id)
        .populate('author')
        .populate('comments.author').exec((err, article)=> {
            if (err)
                res.send(err)
            else if (!article)
                res.send(404)
            else
                res.send(article)
            next()            
        })
    },
    getSequence: (req, res, next) => {
        var sequenceDocument = Counter.findOneAndUpdate({
            query:{_id: 'articleId' },
            update: {$inc:{sequence_value:1}},
            new:true
        });  
        res.send(sequenceDocument.sequence_value);

        // Counter.find({}).exec((err, result) => {
        //     if (err)
        //         res.send(err)
        //     else if (!result)
        //         res.send(404)
        //     else
        //         res.send(result)
        //     next()   
        // })
    },
    clapComment: (req, res, next) => {
        // Article.findById(req.body.article_id).then((article) => {
            // Article.find({_id : req.body.article_id}, {'comments._id': req.body.comment_id})
            // .exec((err, comment) => {
            //     if (err) {
            //         res.send(err)
            //     } else if (!comment) {
            //         console.log('res 404');
            //         res.send(404)
            //     } else {
            //         console.log('comment: ', comment);
            //         //res.send(comment)
            //     }
            // })
        // })

        Article.findById(req.body.article_id).then((article) => {
            console.log('article', article);
            article.clap_comment(req.body.comment_id);
        })

        // Article.findOneAndUpdate({"_id": req.body.article_id, 'comments._id': req.body.comment_id})
        
        // Article.findById(req.body.article_id).then((article) => {
        //     if(article.comments.length > 0) {
        //         console.log('article.comment', article.comments);
        //         article.comments.map((item, key) => {
        //             if(item._id == req.body.comment_id) {
        //                 console.log('comments-', key + '-' + item)
        //                 //article.clap_comment(key, item._id)
        //             }
        //         })
        //     }
        // })
    }
}