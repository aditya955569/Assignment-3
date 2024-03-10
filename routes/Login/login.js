const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const router = express.Router();
const secret = "aditya";
router.use(express.json());
router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        if (await bcrypt.compare(password, user.password)) {
            const accessToken = jwt.sign({ username: user.username, id: user._id }, secret);
            return res.status(200).json({ accessToken });
        }
        res.status(401).json({ message: 'Invalid username or password' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;