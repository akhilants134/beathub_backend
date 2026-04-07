require("dotenv").config();
const mongoose = require("mongoose");
const Artist = require("../models/Artist");
const Song = require("../models/Song");
const User = require("../models/User");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/beathub";

const seedSongs = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    await Promise.all([
      User.deleteMany({}),
      Artist.deleteMany({}),
      Song.deleteMany({}),
    ]);

    const artist = await Artist.create({
      name: "BeatHub Collective",
      genre: "Electronic",
      bio: "Seed artist for BeatHub production verification",
    });

    await User.create([
      {
        username: "Admin User",
        email: "admin@beathub.dev",
        password: "Admin1234!",
        role: "admin",
      },
      {
        username: "Regular User",
        email: "user@beathub.dev",
        password: "User1234!",
        role: "user",
      },
    ]);

    // Clear existing songs
    const songsToInsert = Array.from({ length: 15 }).map((_, i) => ({
      title: `Song ${String.fromCharCode(65 + i)}`, // Song A, Song B, etc.
      artist: artist._id,
      duration: Math.floor(Math.random() * 200) + 120, // Random duration between 2-5 mins
      genre: "Electronic",
      audioUrl: `http://example.com/audio/song_${i}.mp3`,
    }));

    await Song.insertMany(songsToInsert);
    console.log(
      "Successfully inserted seed users, artist, and 15 dummy songs!",
    );

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedSongs();
