import { useEffect, useState } from "react";
import { getTodos } from "../api/todoApi";

export default function TodoPage() {
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  return (
    <div>
      <h1>Todo List</h1>

      {todos.map((todo) => (
        <div key={todo.ID}>
          {todo.title}
        </div>
      ))}
    </div>
  );
}