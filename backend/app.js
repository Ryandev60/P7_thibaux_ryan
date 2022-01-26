const express = require("express");
const app = express();
const path = require("path");

const postRoutes = require("./routes/post.routes");
const userRoutes = require("./routes/user.routes");
const commentRoutes = require("./routes/comment.routes");


const db = require("./models");
//Following lines are to make sure our app can parse the json data
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

//On dit à l'application express de servir le dossier images
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("", postRoutes);
app.use("", userRoutes);
app.use("", commentRoutes);


db.sequelize.sync();

module.exports = app;
