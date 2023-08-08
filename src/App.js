import { useState } from 'react';
import './App.css';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const editTodo = todos.find((item) => item.id === editId);
      const updatedTodos = todos.map((item) =>
        item.id === editTodo.id
          ? (item = { id: item.id, todo })
          : { id: item.id, todo: item.todo }
      );
      setTodos(updatedTodos);
      setEditId(null);
      setTodo('');
      return;
    }

    if (todo !== '') {
      setTodos([...todos, { id: `${todo}-${Date.now()}`, todo }]);
      setTodo('');
    }
  };

  const handleDelete = (id) => {
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos(filteredTodos);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((item) => item.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  return (
    <div className='App'>
      <div className='container'>
        <h1>Todo List App</h1>

        <form className='todoForm' onSubmit={handleSubmit}>
          <input
            type='text'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type='submit'>{editId ? 'Edit' : 'Add'}</button>
        </form>

        <ul className='allTodos'>
          {todos.map((item) => {
            return (
              <li className='singleTodo' key={item.id}>
                <span className='todoText'>{item.todo}</span>
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
