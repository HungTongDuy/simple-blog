const mongoose = require('mongoose')
let UsersPasswordSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }, 
        password: String
    }, { timestamps: true }
)

module.exports = mongoose.model('UsersPasswords', UsersPasswordSchema);