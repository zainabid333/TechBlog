const router = require("express").Router();
const { Post, User } = require("../../models");
const withAuth = require("../../utils/auth");

//create a new post
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.userId,
    });
    res.redirect("/");
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get a post by ID
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["username"] }],
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//rendering the edit post page
router.get("/edit-post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    const post = postData.get({ plain: true });
    res.render("editPost", { post });
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.session.userId,
        },
      }
    );
    if (!updatedPost) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete a post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.userId,
      },
    });
    if (!deletedPost) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
