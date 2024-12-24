const express = require("express");
const morgan = require("morgan");
const app = express();
const userModel = require("./models/user");
const dbConnection = require("./config/db");

app.set("view engine", "ejs");

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.send("What about Harry");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = await userModel.create({
    username: username,
    email: email,
    password: password,
  });
  res.send(newUser);
});

app.get("/get-users", (req, res) => {
  // userModel.find({
  //   username:'1'
  // }).then((users) =>{
  //   res.send(users)
  // })
  userModel
    .findOne({
      username: "muftdeal",
    })
    .then((users) => {
      res.send(users);
    });
});

app.get("/update-user", async (req, res) => {
  await userModel.findOneAndUpdate(
    {
      username: "1",
    },
    {
      email: "one@one.com",
    }
  );
  res.send("user Updated");
});

app.get("/delete-user", async (req, res) => {
  await userModel.findOneAndDelete({
    username: "1",
  });
  res.send("user deleted");
});

app.post("/getData", (req, res) => {
  res.send("Data received");
});

app.listen(3000);
