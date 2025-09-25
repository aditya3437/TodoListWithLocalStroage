import { useState, useEffect } from "react";

function TodoList() {
  const [tasks, setTasks] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storeTodos = JSON.parse(localStorage.getItem("todos"));
    if (storeTodos) {
      setTodos(storeTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const add = () => {
    if (tasks.trim() === "") {
      return;
    }
    const newTask = { id: Date.now(), text: tasks, completed: false };
    setTodos([...todos, newTask]);
    setTasks("");
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTask = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Todo List</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Add a new task"
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
          style={styles.input}
        />
        <button onClick={add} style={styles.addBtn}>
          Add
        </button>
      </div>

      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id} style={styles.listItem}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
              style={styles.checkbox}
            />
            <span
              style={{
                ...styles.taskText,
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#888" : "#333",
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTask(todo.id)}
              style={styles.deleteBtn}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#f8f9fa",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#2c3e50",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginRight: "10px",
    outline: "none",
  },
  addBtn: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#3498db",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#ffffff",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  checkbox: {
    marginRight: "10px",
    cursor: "pointer",
  },
  taskText: {
    flex: 1,
    fontSize: "16px",
  },
  deleteBtn: {
    marginLeft: "10px",
    padding: "5px 10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#e74c3c",
    color: "white",
    cursor: "pointer",
  },
};

export default TodoList;
