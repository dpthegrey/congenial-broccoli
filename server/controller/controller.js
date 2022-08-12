const model = require("../models/model");

// get categories
// POST: http://localhost:8080/api/categories
async function createCategories(req, res) {
  const Create = new model.Categories({
    type: "Investment",
    color: "#FCBE44",
  });

  await Create.save((err) => {
    if (!err) return res.json(Create);
    return res
      .status(400)
      .json({ message: `Error in creating category ${err}` });
  });
}

// GET: http://localhost:8080/api/categories
async function getCategories(req, res) {
  let data = await model.Categories.find({});

  return res.json(data);
}

// POST: http://localhost:8080/api/transaction
async function createTransaction(req, res) {
  if (!req.body)
    return res.status(400).send({ message: "Content can not be empty!" });
  let { name, type, amount } = req.body;

  const create = await new model.Transaction({
    name,
    type,
    amount,
    date: new Date(),
  });

  create.save((err) => {
    if (!err) return res.json(create);
    return res
      .status(400)
      .json({ message: `Error in creating transaction ${err}` });
  });
}

// GET: http://localhost:8080/api/transaction
async function getTransaction(req, res) {
  let data = await model.Transaction.find({});

  return res.json(data);
}

// DELETE: http://localhost:8080/api/transaction
async function deleteTransaction(req, res) {
  if (!req.body)
    return res.status(400).json({ message: "Request body not Found" });
  await model.Transaction.deleteOne(req.body, (err) => {
    if (!err) return res.json({ message: "Transaction Deleted" });
  })
    .clone()
    .catch((err) => {
      res.status(400).json({ message: `Error in deleting transaction ${err}` });
    });
}

// GET: http://localhost:8080/api/labels
async function getLabels(req, res) {
  model.Transaction.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "type",
        foreignField: "type",
        as: "category",
      },
    },
    {
      $unwind: "$category",
    },
  ])
    .then((data) => {
      let labels = data.map((item) => {
        Object.assign(
          {},
          {
            _id: item._id,
            name: item.name,
            type: item.type,
            amount: item.amount,
            color: item.category.color,
          }
        );
      });
      return res.json(labels);
    })
    .catch((err) => {
      res.status(400).json({ message: `Lookup Collection Error ${err}` });
    });
}

module.exports = {
  createCategories,
  getCategories,
  createTransaction,
  getTransaction,
  deleteTransaction,
  getLabels,
};
