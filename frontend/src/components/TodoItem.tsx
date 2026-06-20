import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  editingId: number | null;
  editTitle: string;
  editType: string;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
  setEditTitle: React.Dispatch<React.SetStateAction<string>>;
  setEditType: React.Dispatch<React.SetStateAction<string>>;
  updateTodo: (id: number) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}

export default function TodoItem({
  todo,
  editingId,
  editTitle,
  editType,
  setEditingId,
  setEditTitle,
  setEditType,
  updateTodo,
  deleteTodo,
}: TodoItemProps) {
  return (
    <li>
      {editingId === todo.ID ? (
        <>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <input
            value={editType}
            onChange={(e) => setEditType(e.target.value)}
          />

          <button onClick={() => updateTodo(todo.ID)}>
            Save
          </button>

          <button onClick={() => setEditingId(null)}>
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

          <button onClick={() => deleteTodo(todo.ID)}>
            Delete
          </button>
        </>
      )}
    </li>
  );
}