const router = require("express").Router();
const userRoutes = require("./userController");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentController");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
