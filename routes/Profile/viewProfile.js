const express=require('express');
const router=express.Router();
const User=require('../../models/User');
router.get('/', async (req, res) => {
    try {
        const user=await User.find({_id:req.user.id});
        res.status(200).json(user);
    } catch (error) {
        console.error("Error viewing profile:", error);
        res.status(500).json({ error: "Error updating profile" });
    }
});

module.exports=router;
