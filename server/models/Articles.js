const mongoose = require('mongoose');

const {
    Schema
} = mongoose;

const ArticlesSchema = new Schema({
    title: String,
    body: String,
    author: String
}, {
    timestamps: true
});

// ArticlesSchema.methods.toJSON = () => {
//     return {
//         _id: this._id,
//         title: this.title,
//         body: this.body,
//         author: this.author,
//         createAt: this.createAt,
//         updateAt: this.updateAt
//     };
// };

mongoose.model('Articles', ArticlesSchema);