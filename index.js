// Import required modules
const express = require('express');
const mongoose = require('mongoose');

//MongoDb models
const User = require('./models/User'); 
const Post=require('./models/Post');
const Follow=require('./models/Follow');

//routes
const signupRoute=require('./routes/Signup/signup');
const loginRoute=require('./routes/Login/login');
const viewProfile=require('./routes/Profile/viewProfile')
const editUsernameRoute=require('./routes/Profile/editUsername');
const editPictureRoute=require('./routes/Profile/editProfilePicture');
const editbio=require('./routes/Profile/editbio');
const deleteProfile=require('./routes/Delete/deleteProfile')
const followRoute=require('./routes/Social/follow');
const postRoute=require('./routes/Post/post');
const editpostRoute=require('./routes/Post/editpost');
const deletepostRoute=require('./routes/Delete/deletePost');
const unfollowRoute=require('./routes/Social/unfollow');
const followingRoute=require('./routes/Social/following');
const followersRoute=require('./routes/Social/followers');
const feedRoute=require('./routes/Social/feed');

// Initialize Express app
const app = express();
//YOUR CONNECTION STRING=enter the address that you get from you local mongo databse
// Connect to MongoDB
mongoose.connect('YOUR CONNECTION STRING', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware to parse JSON requests
app.use(express.json());

// Authentication middleware
const authenticateJWT=require('./middleware/authenticateJWT');

// Endpoint to sign up
app.use('/signup',signupRoute);

// Endpoint to log in
app.use('/login',loginRoute);

//view profile
app.use('/viewProfile',authenticateJWT,viewProfile);

//edit username
app.use('/editUsername',authenticateJWT,editUsernameRoute);

//edit profilepictureURL
app.use('/editprofilePictureURL',authenticateJWT,editPictureRoute);

//edit bio
app.use('/editbio',authenticateJWT,editbio);

//delete profile
app.use('/deleteProfile',authenticateJWT,deleteProfile);

// Endpoint to create a post
app.use('/posts',authenticateJWT,postRoute);

//endpoint to edit a post
app.use('/editposts',authenticateJWT,editpostRoute);

//endpoint to delete a post
app.use('/deletepost',authenticateJWT,deletepostRoute);

// Endpoint to follow a user
app.use('/follow',authenticateJWT,followRoute);

// Endpoint to unfollow a user
app.use('/unfollow',authenticateJWT,unfollowRoute);

// Endpoint to get followed users
app.use('/following',authenticateJWT,followingRoute);

// Endpoint to get followers
app.use('/followers',authenticateJWT,followersRoute);

// Endpoint to get posts from followed users
app.use('/feed',authenticateJWT,feedRoute);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = app;