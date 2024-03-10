const express=require('express');
const router=express.Router();
const User=require('../../models/User');
const Post=require('../../models/Post')
const Follow=require('../../models/Follow')
router.get('/', async (req, res) => {
    try {
        const userId = req.user.id;

        // Delete the user's posts
        await Post.deleteMany({ userId: userId });

        // Delete the user from the follow database (both as a follower and followee)
        await Follow.deleteMany({ $or: [{ followerId: userId }, { followeeId: userId }] });

        // Delete the user's profile
        const deletedUser =await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({message:"deleted "})
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Error deleting user" });
    }
});

module.exports=router;
