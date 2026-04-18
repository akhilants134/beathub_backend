require("dotenv").config();
const mongoose = require("mongoose");
const Artist = require("../src/models/Artist");
const Song = require("../src/models/Song");
const User = require("../src/models/User");

const MONGO_URI = process.env.MONGO_URI;
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD;
const USER_EMAIL = process.env.SEED_USER_EMAIL;
const USER_PASSWORD = process.env.SEED_USER_PASSWORD;

if (!MONGO_URI) {
  console.error("SEED ERROR: MONGO_URI is required.");
  process.exit(1);
}

if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !USER_EMAIL || !USER_PASSWORD) {
  console.error(
    "SEED ERROR: Set SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD, SEED_USER_EMAIL, and SEED_USER_PASSWORD.",
  );
  process.exit(1);
}

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
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: "admin",
      },
      {
        username: "Regular User",
        email: USER_EMAIL,
        password: USER_PASSWORD,
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
