const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    // Changed from releaseDate (Date) to releaseYear (Number) to match seed.js
    releaseYear: {
        type: Number,
        required: true
    },
    tracks: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }],
    coverImage: { // Renamed from coverImageUrl to match seed.js
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Album', AlbumSchema);