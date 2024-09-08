const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("home", {
      posts,
      user: req.session.user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.get("/dashboard", async (req, res) => {
  try {
    const user = await User.findByPk(req.session.userId, {
      include: [{ model: Post }],
    });

    const posts = user.posts.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      username: user.username,
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
