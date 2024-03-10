const express=require('express');
const router=express.Router();
const Follow=require('../../models/Follow');
router.delete('/:userID', async (req, res) => {
    try {
        const  userId  = req.params.userID;
        await Follow.findOneAndDelete({ followerId: req.user.id, followeeId: userId });
        res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports=router;
