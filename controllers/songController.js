const Song = require('../models/Song');
const { encodeCursor, decodeCursor } = require('../utils/cursor');

const getSongsCursor = async (req, res) => {

  try {

    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const encodedCursor = req.query.cursor;

    let cursor = null;

    if (encodedCursor) {
      cursor = decodeCursor(encodedCursor);
    }

    const query = cursor ? { _id: { $lt: cursor } } : {};

    const songs = await Song.find(query)
      .sort({ _id: -1 })
      .limit(limit + 1)
      .lean();

    const hasMore = songs.length > limit;

    if (hasMore) {
      songs.pop();
    }

    const nextCursor =
      hasMore && songs.length > 0
        ? encodeCursor(songs[songs.length - 1]._id)
        : null;

    res.status(200).json({
      success: true,
      data: songs,
      pagination: {
        nextCursor,
        hasMore,
        limit,
        count: songs.length
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};

const createSong = async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).json({ success: true, data: song });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getSongsCursor, createSong };
