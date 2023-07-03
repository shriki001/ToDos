const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
  description: { type: String, required: true },
  status: { type: Boolean, default: false },
  deadline: {
    type: Date,
    default: () => new Date(new Date().setMonth(new Date().getMonth() + 1)),
  },
});

const Todo = model("Todo", todoSchema);

module.exports = Todo;
