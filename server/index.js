// General imports
const express = require("express");
const db = require("./models");
const cors = require("cors");

// Route Imports
const authRoute = require("./routes/auth.route");
const usersRoute = require("./routes/users.route");
const uploadRoute = require("./routes/upload.route");
const electionsRoute = require("./routes/elections.route");
const votersRoute = require("./routes/voters.route");
const positionsRoute = require("./routes/positions.route");
const candidate_applicationsRoute = require("./routes/candidate_applications.route");
const voter_applicationsRoute = require("./routes/voter_applications.route");
const candidatesRoute = require("./routes/candidates.route");
//...

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/upload", uploadRoute);
app.use("/uploads", express.static("uploads"));
app.use("/elections", electionsRoute);
app.use("/voters", votersRoute);
app.use("/positions", positionsRoute);
app.use("/candidate_applications", candidate_applicationsRoute);
app.use("/voter_applications", voter_applicationsRoute);
app.use("/candidates", candidatesRoute);
//...

db.sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log("+++---- Server running at port 8000 ----+++");
  });
});
