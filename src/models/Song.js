const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album'
    },
    duration: {
        type: Number,
        required: true
    },
    genre: {
        type: String
    },
    audioUrl: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Song', SongSchema);