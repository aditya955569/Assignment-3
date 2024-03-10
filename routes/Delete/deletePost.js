const express=require('express');
const router=express.Router();
const Post=require('../../models/Post')
router.get('/:postid', async (req, res) => {
    try {
        const postid = req.params.postid;
        // Delete the user's profile
        const deletedPost =await Post.findByIdAndDelete(postid);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({message:"deleted "})
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ error: "Error deleting post" });
    }
});

module.exports=router;
