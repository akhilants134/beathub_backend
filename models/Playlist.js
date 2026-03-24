const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    // Changed from 'tracks' to 'songs' to match seed.js
    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }],
    // Changed from 'createdBy' to 'user' to match seed.js
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Playlist', PlaylistSchema);