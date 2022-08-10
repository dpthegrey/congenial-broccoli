const routes = require("express").Router();

routes.route("/api/categories").get((req, res) => {
  res.json("Get all categories");
});

module.exports = routes;
