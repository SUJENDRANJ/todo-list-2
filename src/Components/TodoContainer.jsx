import { useState, useEffect } from "react";

const TodoContainer = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editBtn, setEditBtn] = useState("Add");
  const [editId, setEditId] = useState(0);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  function handleAddTask(e) {
    e.preventDefault();
    if (todo.trim() === "") return; // Prevent adding empty tasks

    if (editId) {
      // Update existing task
      const updatedTodos = todos.map((t) =>
        t.id === editId ? { id: t.id, text: todo } : t
      );
      setTodos(updatedTodos);
      setEditBtn("Add");
      setEditId(0);
    } else {
      // Add new task
      const newTask = { id: Date.now(), text: todo };
      setTodos([...todos, newTask]);
    }

    setTodo(""); // Clear input field
  }

  function handleEdit(id) {
    const find = todos.find((t) => t.id === id);
    if (find) {
      setTodo(find.text);
      setEditBtn("Edit");
      setEditId(id);
    }
  }

  function handleDelete(id) {
    const newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
  }

  return (
    <div className="border rounded-xl border-gray-300  m-auto h-[500px] max-w-[600px] shadow-xl p-4">
      <div className="mt-10">
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Enter your Task"
            className="border border-gray-400 w-3/4 h-10 rounded-lg px-3 mr-2 outline-0"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button
            className={`border text-white w-1/6 h-10 rounded-lg font-semibold ${
              editBtn === "Edit" ? "bg-green-500" : "bg-blue-500"
            }`}
            type="submit"
          >
            {editBtn}
          </button>
        </form>

        {todos.length === 0 ? (
          <div>
            <h2 className="mt-20 text-3xl text-gray-600 font-semibold">
              Empty!
            </h2>
            <h2 className="mt-10 text-4xl text-gray-700">ADD TASKS</h2>
          </div>
        ) : (
          <ul className="mt-10">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between mb-4"
              >
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-4" />
                  <h3 className="text-lg capitalize text-gray-700 font-semibold">
                    {todo.text}
                  </h3>
                </div>
                <div>
                  <button
                    className="bg-yellow-500 text-white w-16 h-8 rounded-lg mr-1 hover:bg-yellow-600"
                    onClick={() => handleEdit(todo.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="border bg-red-500 text-white w-16 h-8 rounded-lg hover:bg-red-700"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoContainer;
