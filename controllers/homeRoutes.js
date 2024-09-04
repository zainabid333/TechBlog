const router = require("express").Router();
const { Post, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  res.render("home", {
    loggedIn: req.session.loggedIn,
  });
});
module.exports = router;
