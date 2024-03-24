const express = require("express");
const db = require("./models");
const cors = require("cors");
const path = require("path");

//routes
const authRoute = require("./routes/auth.route");
const electionsRoute = require("./routes/elections.route");
const usersRoute = require("./routes/users.route");
const positionsRoute = require("./routes/positions.route");
const candidate_applicationsRoute = require("./routes/candidate_applications.route");
const voter_applicationsRoute = require("./routes/voter_applications.route");
const candidatesRoute = require("./routes/candidates.route");
const votesRoute = require("./routes/votes.route");
//..

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

//middleware
app.use("/auth", authRoute);
app.use("/elections", electionsRoute);
app.use("/users", usersRoute);
app.use("/positions", positionsRoute);
app.use("/candidate_applications", candidate_applicationsRoute);
app.use("/voter_applications", voter_applicationsRoute);
app.use("/candidates", candidatesRoute);
app.use("/votes", votesRoute);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//..

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`---- Server running at port: ${port} ----`);
  });
});
