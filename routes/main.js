const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const loggedController = require("../controllers/logged");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, loggedController.getProfile);
router.get("/training", ensureAuth, loggedController.getFeed);//change to leaderboard
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);

module.exports = router;
