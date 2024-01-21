const express = require("express");
const db = require("./models");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Routers

//...

db.sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log("--- Server running at port 8000 ---");
  });
});
