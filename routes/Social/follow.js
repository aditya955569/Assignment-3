const express = require('express');
const Follow = require('../../models/Follow');
const router = express.Router();
router.post('/:userID', async (req, res) => {
    try {
        const  userId  = req.params.userID;
        if(userId!=req.user.id){
            const follow = new Follow({ followerId: req.user.id, followeeId: userId });
            await follow.save();
            res.status(200).json({ message: 'User followed successfully' });
        }
        else{
            res.status(200).json({message:'Follower and followee cannot be same'})
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports=router;