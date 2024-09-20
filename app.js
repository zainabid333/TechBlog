const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require("path");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
  helpers,
  partialsDir: path.join(__dirname, "views/partials"),
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const sess = {
  secret: process.env.SESSION_SECRET || "Super secret",
  cookie: {
    maxAge: 2000000, // 30 minutes
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening on http://localhost:${PORT}`)
  );
});
