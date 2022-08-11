const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categoriesModel = new Schema({
  type: { type: String, default: "Investment" },
  color: { type: String, default: "#FCBE44" },
});

const transactionModel = new Schema({
  name: { type: String, default: "Anonymous" },
  type: { type: String, default: "Investment" },
  amount: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

const Categories = mongoose.model("categories", categoriesModel);
const Transaction = mongoose.model("transactions", transactionModel);

exports.default = {
  Transaction,
};
module.exports = {
  Categories,
  Transaction,
};
