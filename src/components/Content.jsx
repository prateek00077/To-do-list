import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Content = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    const newTodo = {
      id: uuidv4(),
      todo,
      isCompleted: false,
    };

    const updatedTodos = [...todos, newTodo];
    sessionStorage.setItem('todos', JSON.stringify(updatedTodos)); // Save to sessionStorage
    setTodos(updatedTodos);
    setTodo('');
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
    sessionStorage.setItem('todos', JSON.stringify(updatedTodos)); // Update sessionStorage
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
    sessionStorage.setItem('todos', JSON.stringify(updatedTodos)); // Update sessionStorage
  };

  const handleClear = () => {
    setTodos([]);
    sessionStorage.removeItem('todos'); // Clear sessionStorage
  };

  const handleEdit = (e, id) => {
    const itemToEdit = todos.find((item) => item.id === id);
    setTodo(itemToEdit.todo);
    handleDelete(id); // Remove the item so it can be re-added
  };

  const toggleFinished = () => {
    setShowFinished((prev) => !prev);
  };

  useEffect(() => {
    // Load todos from sessionStorage on initial render
    const savedTodos = JSON.parse(sessionStorage.getItem('todos') || '[]');
    setTodos(savedTodos);
  }, []);

  return (
    <div className="bg-slate-400 min-h-[80vh] pt-4">
      <form onSubmit={handleAdd} className="flex justify-center">
        <h1 className="text-black font-bold">Add a task</h1>
        <input
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          type="text"
          className="w-80 mx-5"
        />
        <button
          disabled={todo.length < 3}
          className="disabled:bg-slate-600 bg-slate-700 text-white w-20 font-bold"
        >
          Add
        </button>
      </form>

      <div className="my-10 text-black font-bold font-extrabold">Your tasks</div>

      <div className="bg-slate-700 text-white p-4 mx-auto font-semibold w-full max-w-lg border-2 border-gray-800">
        <input
          type="checkbox"
          onChange={toggleFinished}
          checked={showFinished}
          className=""
        />
        Show Finished tasks
      </div>

      <div
        className="w-full max-w-lg h-80 border-2 border-gray-800 p-4 mx-auto bg-gray-100 overflow-auto"
        id="output"
      >
        {todos.length === 0 && <div className="flex">No todos to display</div>}
        {todos.map((item) => {
          return (
            (showFinished || !item.isCompleted) && (
              <div key={item.id} className="flex justify-evenly my-2">
                <input
                  name={item.id}
                  type="checkbox"
                  onChange={handleCheckbox}
                  id=""
                  className="myCheckbox"
                  checked={item.isCompleted}
                />
                <div className="text w-full max-w-sm">
                  <div className={item.isCompleted ? 'line-through' : ''}>
                    {item.todo}
                  </div>
                </div>
                <div className="flex h-full buttons">
                  <button
                    onClick={(e) => {
                      handleEdit(e, item.id);
                    }}
                    className="text-white bg-slate-700 mx-3 w-20 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                    className="text-white bg-slate-700 mx-3 w-20 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          );
        })}
      </div>

      <button
        onClick={handleClear}
        className="text-white bg-slate-700 mx-9 w-20"
      >
        Clear
      </button>
      <button
        onClick={() => {}}
        className="text-white bg-slate-700 mx-9 w-20"
      >
        Done
      </button>
    </div>
  );
};

export default Content;
