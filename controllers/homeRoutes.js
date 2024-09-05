const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  res.render("home", {
    loggedIn: req.session.loggedIn,
  });
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.get("/dashboard", withAuth, async (req, res) => {
  // Get the user's posts and comments
  const userPosts = await Post.findAll({
    where: {
      userId: req.session.userId,
    },
    include: [
      {
        model: Comment,
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      },
    ],
  });

  // Get the user's comments
  const userComments = await Comment.findAll({
    where: {
      userId: req.session.userId,
    },
    include: [
      {
        model: Post,
        attributes: ["title"],
      },
    ],
  });

  // Render the dashboard template with the user's posts and comments
  res.render("dashboard", {
    posts: userPosts,
    comments: userComments,
  });
});

module.exports = router;
