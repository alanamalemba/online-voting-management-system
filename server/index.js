// General imports
const express = require("express");
const db = require("./models");
const cors = require("cors");

// Route Imports
const authRoute = require("./routes/auth.route");
const usersRoute = require("./routes/users.route");
const uploadRoute = require("./routes/upload.route");
const electionsRoute = require("./routes/elections.route");
//...

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/upload", uploadRoute);
app.use("/elections", electionsRoute);
//...

db.sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log("+++---- Server running at port 8000 ----+++");
  });
});
