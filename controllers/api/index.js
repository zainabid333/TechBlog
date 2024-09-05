const router = require("express").Router();

router.get("/test", (req, res) => {
  res.json({ message: "api called" });
});
module.exports = router;
