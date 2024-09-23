const router = require("express").Router();
const { Comment } = require("../../dbtable");
const withAuth = require("../../utils/auth");

//Add a new comment
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      post_id: req.body.post_id,
      user_id: req.session.userId,
    });
    res.redirect(`/api/posts/${req.body.post_id}`);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
