const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const { getSongsCursor, createSong } = require('../controllers/songController');

router.get('/songs', getSongsCursor);

router.post('/songs', [
  body('title').trim().escape().notEmpty().withMessage("Song title is required"),
  body('artist').trim().escape().notEmpty().withMessage("Artist name is required"),
  body('genre').trim().escape().optional(),
  body('album').trim().escape().optional()
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, createSong);

module.exports = router;
