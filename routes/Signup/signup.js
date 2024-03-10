const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { username, bio, profilePictureURL,password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, bio,profilePictureURL,password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;