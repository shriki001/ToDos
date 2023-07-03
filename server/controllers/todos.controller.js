const Todo = require("../models/todo.model");
const { StatusCodes } = require("express-http-status");
const Publisher = require("../publisher");

module.exports.CheckStatus = async (req, res) => {
  const todos = await Todo.find({
    status: false,
    deadline: { $lt: new Date() },
  });
  const data = [];
  for (const todo of todos) data.push(todo.description);
  if (todos.length) await Publisher.send(data.toString());
  return res.sendStatus(StatusCodes.ACCEPTED);
};

module.exports.GetTodos = async (req, res) => {
  const PAGE_SIZE = 5;
  const page = parseInt(req.query.page || "0");
  const total = await Todo.countDocuments({});
  try {
    const todos = await Todo.find({})
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);

    return res.send({
      todos,
      total,
      rowPerPage: PAGE_SIZE,
    });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

module.exports.CreateTodo = async (req, res) => {
  const { description, deadline } = req.body;
  if (!description) return res.sendStatus(StatusCodes.BAD_REQUEST);
  try {
    await Todo.create({ description, deadline });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json(err);
  }
  return res.sendStatus(StatusCodes.CREATED);
};

module.exports.UpdateTodo = async (req, res) => {
  const { params, body } = req;
  const { description, status } = body;
  const { id } = params;
  try {
    await Todo.findByIdAndUpdate(id, { description, status });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json(err);
  }
  return res
    .status(StatusCodes.OK)
    .json({ message: "todo update successfully" });
};

module.exports.DeleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json(err);
  }
  return res.sendStatus(StatusCodes.OK);
};
