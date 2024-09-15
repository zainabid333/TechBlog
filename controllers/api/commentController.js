const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//Add a new comment
router.post("/newcomment", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      post_id: req.body.post_id,
      user_id: req.session.userId,
    });
    res.redirect(`/post/${req.body.post_id}`);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
