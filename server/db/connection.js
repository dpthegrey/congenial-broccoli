const mongoose = require("mongoose");

const conn = mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

module.exports = conn;
