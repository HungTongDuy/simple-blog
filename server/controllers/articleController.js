const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const fs = require('fs')
const cloudinary = require('cloudinary')
module.exports = {
    addArticle: (req, res, next) => {
        console.log('req.body', req.body);
        // let { text, title, claps, description } = req.body
        // if (req.files != undefined && req.files.image) {
        //     cloudinary.uploader.upload(req.files.image.path, (result) => {
        //         let obj = { text, title, claps, description, feature_img: result.url != null ? result.url : '' }
        //         saveArticle(obj)
        //     },{
        //         resource_type: 'image',
        //         eager: [
        //             {effect: 'sepia'}
        //         ]
        //     })
        // } else {
        //     saveArticle({ text, title, claps, description, feature_img: '' })
        // }
        // function saveArticle(obj) {
        //     new Article(obj).save((err, article) => {
        //         if (err)
        //             res.send(err)
        //         else if (!article)
        //             res.send(400)
        //         else {
        //             return article.addAuthor(req.body.author_id).then((_article) => {
        //                 return res.send(_article)
        //             })
        //         }
        //         next()
        //     })
        // }
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
            return article.comment({
                author: req.body.author_id,
                text: req.body.comment
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
    }
}