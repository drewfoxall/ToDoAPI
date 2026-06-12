import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Todo {
  ID: number;
  title: string;
  type: string;
}

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
  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
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


      <button onClick={logout}>
        Logout
      </button>
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
      {editingId === todo.ID ? (
        <>
          <input
            value={editTitle}
            onChange={(e) =>
              setEditTitle(e.target.value)
            }
          />

          <input
            value={editType}
            onChange={(e) =>
              setEditType(e.target.value)
            }
          />

          <button
            onClick={() => updateTodo(todo.ID)}
          >
            Save
          </button>

          <button
            onClick={() => setEditingId(null)}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          {todo.title} ({todo.type})

          <button
            onClick={() => {
              setEditingId(todo.ID);
              setEditTitle(todo.title);
              setEditType(todo.type);
            }}
          >
            Edit
          </button>

          <button
            onClick={() => deleteTodo(todo.ID)}
          >
            Delete
          </button>
        </>
      )}
    </li>
  ))}
</ul>
    </div>
  );
}