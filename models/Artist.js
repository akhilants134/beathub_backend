const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    profileImageUrl: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Artist', ArtistSchema);