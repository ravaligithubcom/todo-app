import React, { useState, useEffect } from "react";
import axios from "axios";
import "./taskform.css"; // Assuming you'll style it with a separate CSS file

function TaskForm({ taskId, onClose, onTaskSaved }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // If editing an existing task, fetch its data
  useEffect(() => {
    if (taskId) {
      axios
        .get(`http://localhost:3000/api/tasks/${taskId}`)
        .then((response) => {
          const task = response.data;
          setTitle(task.title);
          setDescription(task.description);
          setStatus(task.status);
        })
        .catch((error) => {
          console.error("Error fetching task:", error);
          setErrorMessage("Error fetching task data.");
        });
    }
  }, [taskId]);

  // Handle form submission (Create or Update task)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const taskData = {
      title,
      description,
      status,
    };

    try {
      let response;
      if (taskId) {
        // Update existing task
        response = await axios.put(
          `http://localhost:3000/api/tasks/${taskId}`,
          taskData
        );
      } else {
        // Create new task
        response = await axios.post(
          "http://localhost:3000/api/tasks",
          taskData
        );
      }

      // Notify parent component that the task has been saved
      onTaskSaved(response.data);

      // Reset the form and close it
      setTitle("");
      setDescription("");
      setStatus("pending");
      onClose();
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="task-form-container">
      <h2>{taskId ? "Edit Task" : "Add Task"}</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Task Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Task Status</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button type="submit" className="task-form-btn" disabled={loading}>
          {loading
            ? taskId
              ? "Updating..."
              : "Creating..."
            : taskId
            ? "Update Task"
            : "Create Task"}
        </button>
      </form>

      <button className="close-btn" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

export default TaskForm;
