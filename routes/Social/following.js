const express=require('express');
const Follow=require('../../models/Follow');
const router=express.Router();
router.get('/', async (req, res) => {
    try {
        const follows = await Follow.find({ followerId: req.user.id });
        const followedUserIds = follows.map(follow => follow.followeeId);
        const followedUsers = await User.find({ _id: { $in: followedUserIds } });
        res.status(200).json(followedUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports=router;
