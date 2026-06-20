interface TodoFormProps {
  title: string;
  type: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
  createTodo: (e: React.FormEvent) => Promise<void>;
}

export default function TodoForm({
  title,
  type,
  setTitle,
  setType,
  createTodo,
}: TodoFormProps) {
  return (
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
  );
}