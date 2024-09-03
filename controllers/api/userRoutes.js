const router = require("express").Router();
const { User } = require("../../models");

// Define your routes here
router.post("/signup", async (req, res) => {
  // Signup logic

  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  // Login logic
});

router.post("/logout", (req, res) => {
  // Logout logic
});

module.exports = router;
