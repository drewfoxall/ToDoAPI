import { useEffect, useState } from "react";

interface Todo {
  ID: number;
  title: string;
  type: string;
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");

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

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>My Todos</h1>

      <form onSubmit={createTodo}>
        <input
          type="text"
          placeholder="Todo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Todo type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />

        <button type="submit">
          Create Todo
        </button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.ID}>
            {todo.title} ({todo.type})
          </li>
        ))}
      </ul>
    </div>
  );
}