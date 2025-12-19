import infoUser from "../models/userData.js";

const changeTask = async (req, res) => {
  try {
    const { id, task, description, date } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required",
      });
    }

    // Build the update object dynamically
    const updateFields = {};
    if (task !== undefined) updateFields.task = task;
    if (description !== undefined) updateFields.description = description;
    if (date !== undefined) updateFields.date = date;

    // Find task by ID and update
    const updatedTask = await infoUser.findByIdAndUpdate(id, {
      $set: updateFields,
    });

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export default changeTask;
