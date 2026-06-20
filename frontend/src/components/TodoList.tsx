import TodoItem from "./TodoItem";
import type { Todo } from "../types/todo";

interface TodoListProps {
  todos: Todo[];
  editingId: number | null;
  editTitle: string;
  editType: string;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
  setEditTitle: React.Dispatch<React.SetStateAction<string>>;
  setEditType: React.Dispatch<React.SetStateAction<string>>;
  updateTodo: (id: number) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}

export default function TodoList({
  todos,
  editingId,
  editTitle,
  editType,
  setEditingId,
  setEditTitle,
  setEditType,
  updateTodo,
  deleteTodo,
}: TodoListProps) {
  return (
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
  );
}