// General imports
const express = require("express");
const db = require("./models");
const cors = require("cors");

// Route Imports
const authRoute = require("./routes/auth.route");
//...

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoute);
//...

db.sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log("+++---- Server running at port 8000 ----+++");
  });
});
