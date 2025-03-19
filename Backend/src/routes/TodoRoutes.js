import { createdTodo, deleteTodo, allTodos, updateTodo, getTodoById } from "../controllers/Todo.controller.js";
import express from "express";

const router = express.Router();
router.post('/todos', createdTodo)
router.get('/todos', allTodos)
router.get('/todos/t/:id', getTodoById)

router.delete('/todos/:id', deleteTodo)
router.put('/todos/:id', updateTodo);


export default router;

