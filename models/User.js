const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    bio: String,
    profilePictureURL: String,
    password: String
});

const User = mongoose.model('User', userSchema);

module.exports=User