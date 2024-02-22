const express = require("express");
const db = require("./models");
const cors = require("cors");

//routes
const authRoute = require("./routes/auth.route");

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

//middleware
app.use("/auth", authRoute);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`---- Server running at port: ${port} ----`);
  });
});
