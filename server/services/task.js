const task = require("../models/task");

const addTask = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;
    const { user } = req;
    if (!title || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (title.length < 6) {
      return res.status(400).json({ error: "Title must have 6 characters" });
    }

    if (description.length < 6) {
      return res
        .status(400)
        .json({ error: "Description must have 6 characters" });
    }

    const newTask = new task({ title, description, priority, status });
    await newTask.save();
    user.tasks.push(newTask._id);
    await user.save();
    return res.json({ success: "Task added successfully" });
  } catch (error) {
    console.log(error);
    
  }
};

const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status } = req.body;
    //const {user} = req.user;
    if (!title || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (title.length < 6) {
      return res.status(400).json({ error: "Title must have 6 characters" });
    }

    if (description.length < 6) {
      return res
        .status(400)
        .json({ error: "Description must have 6 characters" });
    }

    await task.findByIdAndUpdate(id, { title, description, priority, status });
    return res.status(200).json({ success: "Task updated" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Internal server error" });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskDetails = await task.findById(id);
    return res.status(200).json({ taskDetails });
  } catch (error) {
    console.log({ error: "Internal server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const reqTask = await task.findByIdAndDelete(id);
    if(!reqTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.json({ success: "Task Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};



module.exports = { addTask, editTask, getTask, deleteTask };
