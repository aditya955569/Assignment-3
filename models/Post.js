const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    content: String,
    timestamp: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Post = mongoose.model('Post', postSchema);

module.exports=Post