const { Router } = require("express");
const TodosController = require("../controllers/todos.controller");

const router = Router();

router.get("/", TodosController.GetTodos);
router.get("/status", TodosController.CheckStatus);
router.post("/", TodosController.CreateTodo);
router.put("/:id", TodosController.UpdateTodo);
router.delete("/:id", TodosController.DeleteTodo);

module.exports = router;
