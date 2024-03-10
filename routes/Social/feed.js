const express=require('express');
const router=express.Router();
const Follow=require('../../models/Follow');
const Post=require('../../models/Post')
router.get('/', async (req, res) => {
    try {
        const follows = await Follow.find({ followerId: req.user.id });
        const followedUserIds = follows.map(follow => follow.followeeId);
        const posts = await Post.find({ userId: { $in: followedUserIds } }).sort('-timestamp');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports=router;