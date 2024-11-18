import { useState } from 'react';

interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, task: 'Buy groceries', completed: false },
    { id: 2, task: 'Do laundry', completed: false },
    { id: 3, task: 'Clean the house', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');

  const handleAddTodo = () => {
    if (newTask.trim() !== '') {
      setTodos([...todos, { id: todos.length + 1, task: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleToggleCompleted = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Todo List</h2>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add new task"
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
      />
      <button
        onClick={handleAddTodo}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-4"
      >
        Add Todo
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleCompleted(todo.id)}
                className="mr-2"
              />
              <span className={todo.completed ? 'text-gray-300 line-through' : 'text-gray-600'}>{todo.task}</span>
            </div>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;