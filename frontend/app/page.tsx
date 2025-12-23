"use client";

import { useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  description: string | null;
  priority: string | null;
  status: string | null;
  due_date: string | null;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);


  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");

  const fetchTasks = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.tasks);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const payload = {
    title,
    description,
    priority,
    status,
    due_date: dueDate || null,
  };

  if (editingTaskId) {
    // UPDATE
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${editingTaskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } else {
    // CREATE
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  // Reset form
  setTitle("");
  setDescription("");
  setPriority("medium");
  setStatus("todo");
  setDueDate("");
  setEditingTaskId(null);

  fetchTasks();
};


  const handleDelete = async (taskId: string) => {
  const confirmDelete = confirm("Are you sure you want to delete this task?");
  if (!confirmDelete) return;

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
    method: "DELETE",
  });

  fetchTasks();
};


  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h1>Task Manager</h1>

      {/* Create Task Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <h2>{editingTaskId ? "Edit Task" : "Create Task"}</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <br /><br />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <br /><br />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <br /><br />

        <button type="submit">
          {editingTaskId ? "Update Task" : "Add Task"}
        </button>
      </form>

      {/* Task List */}
      {loading && <p>Loading tasks...</p>}

      {!loading && tasks.length === 0 && <p>No tasks found.</p>}

      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: "12px" }}>
            <strong>{task.title}</strong>
            <div>Status: {task.status}</div>
            <div>Priority: {task.priority}</div>
            {task.due_date && <div>Due: {task.due_date}</div>}
            <button
            onClick={() => {
              setEditingTaskId(task.id);
              setTitle(task.title);
              setDescription(task.description || "");
              setPriority(task.priority || "medium");
              setStatus(task.status || "todo");
              setDueDate(task.due_date || "");
            }}
            style={{ marginLeft: "10px", color: "yellow" }}
          >
          Edit
        </button>

        <button
          onClick={() => handleDelete(task.id)}
          style={{ marginLeft: "10px", color: "red" }}
        >
          Delete
        </button>

          </li>
        ))}
      </ul>
    </div>
  );
}
