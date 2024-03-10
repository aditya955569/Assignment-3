const mongoose = require('mongoose');


const followSchema = new mongoose.Schema({
    followerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    followeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Follow = mongoose.model('Follow', followSchema);

module.exports=Follow