const Song = require("../models/Song");
const { encodeCursor, decodeCursor } = require("../utils/cursor");

const getSongsCursor = async (req, res) => {
  try {
    const parsedLimit = parseInt(req.query.limit, 10);
    const parsedPage = parseInt(req.query.page, 10);
    const limit = Number.isNaN(parsedLimit)
      ? 10
      : Math.min(Math.max(parsedLimit, 1), 100);
    const page = Number.isNaN(parsedPage) ? 1 : Math.max(parsedPage, 1);
    const skip = (page - 1) * limit;

    const [songs, total] = await Promise.all([
      Song.find({})
        .select("-__v")
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Song.countDocuments({}),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    res.status(200).json({
      success: true,
      data: songs,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
        count: songs.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const createSong = async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();

    const createdSong = await Song.findById(song._id).select("-__v").lean();
    res.status(201).json({ success: true, data: createdSong });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getSongsCursor, createSong };
