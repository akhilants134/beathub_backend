const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const { getSongsCursor, createSong } = require("../controllers/songController");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/songs", getSongsCursor);

router.post(
  "/songs",
  verifyToken,
  authorizeRoles("admin"),
  [
    body("title")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Song title is required"),
    body("artist")
      .isMongoId()
      .withMessage("Artist must be a valid MongoDB ObjectId"),
    body("album")
      .optional()
      .isMongoId()
      .withMessage("Album must be a valid MongoDB ObjectId"),
    body("duration")
      .isInt({ min: 1 })
      .withMessage("Duration must be a positive number"),
    body("audioUrl").isURL().withMessage("Audio URL must be a valid URL"),
    body("genre").trim().escape().optional(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createSong,
);

module.exports = router;
