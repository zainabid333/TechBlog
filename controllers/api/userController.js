const router = require("express").Router();
const { User } = require("../../dbtable");

// SignUp route
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    req.session.userId = user.id; // Store the user ID in session
    req.session.logged_in = true; // Set logged_in to true
    res.redirect("/login");
  } catch (error) {
    console.error("Signup error:", error);
    res.status(400).json({ error: "Signup failed. Please try again." });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("loging in", username);
    const userData = await User.findOne({ where: { username } });

    if (!userData) {
      res.status(400).json({ message: "Incorrect username or password" });
      return;
    }

    const validPassword = await userData.checkPassword(password);
    console.log("valid password");

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect username or password" });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.logged_in = true;
      console.log("logged in");
      console.log(req.session.logged_in);
      console.log(req.session.userId);

      res.redirect("/dashboard");
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//logout routes

router.get("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect("/");
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
