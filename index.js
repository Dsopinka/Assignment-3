const express = require("express");
const ejs = require("ejs");
const path = require("path");
const app = express();
const sessions = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(sessions({
  secret: "very secret key",
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

const PORT = 4000;

app.listen(PORT, () => {
  console.log("App listening on port ", PORT);
});

app.get("/", (req, res) => {
  let user = req.session.user;

  res.render("index", {user});
});

app.get("/profile", (req, res) => {
  let user = req.session.user;

  res.render("profile", {user});
});

app.get("/slide-show", (req, res) => {
  res.render("slide-show");
});

app.get("/terms", (req, res) => {
  res.render("terms");
});

app.post("/update-profile", (req, res) => {
  console.log(req.body);

  // Store the user data in the session
  req.session.user = req.body;

  res.redirect("/profile");
});

app.get("/rock-paper", (req, res) => {
  res.render("rock-paper");
});

/*app.post("/update-index", (req, res) => {
  req.session.user = req.body;
  res.status(200).json(req.body);
});*/


app.get('/get-user-data', (req, res) => {
  res.json(req.session.user || {});
});



