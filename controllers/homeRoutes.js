const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    let userData;
    if (req.session.userId) {
      userData = await User.findByPk(req.session.userId, {
        attributes: ["username"],
      });
    }

    res.render("home", {
      posts,
      user: userData ? userData.get({ plain: true }) : null,
      logged_in: !!req.session.userId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.userId) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.userId) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup");
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    const post = postData.get({ plain: true });

    // Fetch all posts for the sidebar
    const allPostsData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
      order: [["createdAt", "DESC"]],
    });

    const allPosts = allPostsData.map((post) => post.get({ plain: true }));

    res.render("home", {
      posts: allPosts,
      selectedPost: post,
      user: req.session.user,
      logged_in: !!req.session.userId,
      is_owner: post.user_id === req.session.userId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      include: [{ model: Post }],
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
