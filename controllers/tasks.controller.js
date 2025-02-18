import Task from "../models/tasks.model.js";
import User from "../models/User.model.js";

export const handleGetAll = async (req, res) => {
  try {
    const { username } = req.username;

    if (!username) {
      return res.status(400).json({ message: "Username is required." });
    }

    // Find user by username
    const user = await User.findOne({ name: username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find tasks assigned to the user
    const tasks = await Task.find({ assignedTo: user._id });

    res.status(200).json({ username, tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const handleAdd = async (req, res) => {
  try {
    const { title, description, status, assignedTo, dueDate } = req.body;
    const task = await Task.create({
      title,
      description,
      status,
      assignedTo,
      dueDate,
    });
    res.status(201).json({ task });
  } catch (error) {
    console.error(error);
  }
};

export const handleUpdate = async (req, res) => {
  try {
    const { id } = req.params; // Get task ID from URL
    const updateData = req.body; // Get updated fields from request body

    const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
      new: true, // Return updated document
      runValidators: true, // Ensure updates follow schema rules
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ task: updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const handleDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const handleDeleteAll = async (req, res) => {
  try {
    const result = await Task.deleteMany(); // Removes all tasks

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No tasks found to delete" });
    }

    res
      .status(200)
      .json({ message: `${result.deletedCount} tasks deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
