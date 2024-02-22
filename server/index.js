const express = require("express");
const db = require("./models");

const app = express();

const port = 8000;

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`---- Server running at port: ${port} ----`);
  });
});
