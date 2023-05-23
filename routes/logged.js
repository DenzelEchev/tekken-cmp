const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const loggedController = require("../controllers/logged");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post('/updateRank', loggedController.updateRank);
router.get('/leaderboard', ensureAuth, loggedController.getLeaderboard);

module.exports = router;
