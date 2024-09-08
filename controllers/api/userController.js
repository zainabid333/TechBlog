const router = require("express").Router();
const { User } = require("../../models");

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
    const {username, password } = req.body;
    console.log("Login attempt with email:", username);

    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.log("User not found");
      return res
        .status(400)
        .render("login", { error: "Invalid email or password." });
    }

    console.log("Stored hashed password:", user.password);
    console.log("Raw password from request:", password);

    const isPasswordValid = user.checkPassword(password);
    console.log("Password comparison result:", isPasswordValid);

    if (isPasswordValid) {
      req.session.userId = user.id;
      console.log("Session userId before save:", req.session.userId);
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          return res.status(500).render("login", {
            error: "Failed to save session. Please try again.",
          });
        }
        console.log("Session saved successfully:", req.session);
        res.redirect("/");
      });
    } else {
      console.log("Invalid password");
      res.status(400).render("login", { error: "Invalid email or password." });
    }
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .render("login", { error: "Login failed. Please try again." });
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//logout routes

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
