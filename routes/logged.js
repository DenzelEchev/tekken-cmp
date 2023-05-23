const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const loggedController = require("../controllers/logged");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post('/update-rank', loggedController.updateRank);

module.exports = router;
