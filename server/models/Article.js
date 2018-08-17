// server/models/Article.js
const mongoose = require('mongoose')
let ArticleSchema = new mongoose.Schema(
    {
        articleId: Number,
        text: String,
        title: String,
        description: String,
        feature_img: String,
        claps: Number,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: [
            {
                author: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                text: String,
                createdAt: Date,
                claps: Number
            }
        ]
    }, { timestamps: true }
);
ArticleSchema.methods.clap = function() {
    this.claps++
    return this.save()
}
ArticleSchema.methods.comment = function(c) {
    this.comments.push(c)
    return this.save()
}
ArticleSchema.methods.addAuthor = function (author_id) {
    this.author = author_id
    return this.save()
}
ArticleSchema.methods.getUserArticle = function (_id) {
    Article.find({'author': _id}).then((article) => {
        return article
    })
}
ArticleSchema.methods.clap_comment = (comment_id) => {
    var comment = this.comments.find((comment) => {
        
        if(comment._id = comment_id) {
            return comment
        }
    })
    commment.claps++
    // arr_comment.map((item, key) => {
    //     if(item._id == comment_id) {
    //         this.comment[key].claps++
    //     }
    // })
    //this.comments[key].claps++
    // this.comments.map((item, key) => {
    //     if(item._id == comment_id) {
    //         this.comment[key].claps++
    //     }
    // })
    
    return this.save()
}
module.exports = mongoose.model('Article', ArticleSchema)