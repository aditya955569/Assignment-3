const express = require('express');
const Post=require('../../models/Post');
const router=express.Router();
router.post('/', async (req, res) => {
    try {
        const { content } = req.body;
        const post = new Post({ content, userId: req.user.id });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports=router;
