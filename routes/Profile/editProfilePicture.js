const express=require('express');
const router=express.Router();
const User=require('../../models/User');
router.post('/', async (req, res) => {
    try {
        const { profilePictureURL } = req.body;
        const userID = req.user.id;

        // Use await to ensure the update operation completes before sending the response
        const result = await User.updateOne(
            { _id: userID },
            { $set: { profilePictureURL: profilePictureURL } }
        );

        // Check if the update operation affected any documents
        if (result.nModified === 0) {
            // No document was modified, return a 404 status
            return res.status(404).json({ error: "User not found or no changes made" });
        }

        // Send the response after the update operation is completed
        res.status(200).json({ message: "Updated Successfully" });
    } catch (error) {
        console.error("Error updating profilePictureURL:", error);
        res.status(500).json({ error: "Error updating profilePictureURL" });
    }
});

module.exports=router;
