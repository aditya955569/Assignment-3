const express = require('express');
const Post=require('../../models/Post');
const router=express.Router();
router.post('/:postid', async (req, res) => {
    try {
        const { content } = req.body;
        const postid = req.params.postid;
        const result=await Post.updateOne(
            {_id:postid},
            {$set:{
                content:content,
                timestamp:Date.now()
            }}
        )
        if(result.nModified===0){
            return res.status(404).json({ error: "User not found or no changes made" });
        }
        res.status(200).json({ message: "Updated Successfully" });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports=router;
