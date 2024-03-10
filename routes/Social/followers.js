const express=require('express');
const router=express.Router();
const Follow=require('../../models/Follow');
router.get('/', async (req, res) => {
    try {
        const follows = await Follow.find({ followeeId: req.user.id });
        const followerIds = follows.map(follow => follow.followerId);
        const followers = await User.find({ _id: { $in: followerIds } });
        res.status(200).json(followers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports=router;