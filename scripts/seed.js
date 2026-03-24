require('dotenv').config();
const mongoose = require('mongoose');
const Song = require('../models/Song');

// A dummy Artist schema just to satisfy the ObjectId ref requirement if it doesn't exist
// We will just generate a random ObjectId for the artist to keep things simple
const dummyArtistId = new mongoose.Types.ObjectId();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/beathub';

const seedSongs = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing songs
    await Song.deleteMany({});
    console.log('Cleared existing songs.');

    const songsToInsert = Array.from({ length: 15 }).map((_, i) => ({
      title: `Song ${String.fromCharCode(65 + i)}`, // Song A, Song B, etc.
      artist: dummyArtistId,
      duration: Math.floor(Math.random() * 200) + 120, // Random duration between 2-5 mins
      audioUrl: `http://example.com/audio/song_${i}.mp3`
    }));

    await Song.insertMany(songsToInsert);
    console.log('Successfully inserted 15 dummy songs!');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedSongs();