import { Router } from "express";
import {
  handleAdd,
  handleDelete,
  handleUpdate,
  handleDeleteAll,
  handleGetAll,
} from "../controllers/tasks.controller.js";

const taskRouter = Router();

// Get all tasks for the authenticated user
taskRouter.get("/", handleGetAll);

// Add a new task
taskRouter.post("/add", handleAdd);

// Update an existing task
taskRouter.put("/:id", handleUpdate);

// Delete a specific task
taskRouter.delete("/:id", handleDelete);

// Delete all tasks
taskRouter.delete("/", handleDeleteAll);

export default taskRouter;
