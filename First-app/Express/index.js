const express = require("express");
const path = require("path");
const moment = require("moment");
const app = express();
const port = process.env.port || 5000;
const members = require("./Members");

app.use(express.static(path.join(__dirname, "public")));

const logger = (req, res, next) => {
  console.log(
    `${req.protocol}:://${req.get("host")}${
      req.originalUrl
    }: ${moment().format()}`
  );
  next();
};

app.use(logger);

app.get("/api/members", (req, res) => {
  res.json(members);
});

app.get("/", (req, res) => {
  res.send("<h1>heelo world</h1>");
});

app.listen(port, () => {
  console.log(`Server is listing in port ${port}`);
});
