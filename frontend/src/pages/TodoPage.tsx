import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";

import type { Todo } from "../types/todo";

export default function TodoPage() {
  const navigate = useNavigate();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editType, setEditType] = useState("");

  async function fetchTodos() {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8080/todos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    setTodos(data);
  }

  async function createTodo(e: React.FormEvent) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        type,
      }),
    });

    if (response.ok) {
      setTitle("");
      setType("");
      fetchTodos();
    }
  }

  async function updateTodo(id: number) {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:8080/todos/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editTitle,
          type: editType,
        }),
      }
    );

    if (response.ok) {
      setEditingId(null);
      fetchTodos();
    }
  }

  async function deleteTodo(id: number) {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:8080/todos/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      fetchTodos();
    }
  }

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>My Todos</h1>

      <button onClick={logout}>
        Logout
      </button>

      <TodoForm
        title={title}
        type={type}
        setTitle={setTitle}
        setType={setType}
        createTodo={createTodo}
      />

      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.ID}
            todo={todo}
            editingId={editingId}
            editTitle={editTitle}
            editType={editType}
            setEditingId={setEditingId}
            setEditTitle={setEditTitle}
            setEditType={setEditType}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}