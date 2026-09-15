'use client';

import { useEffect, useState } from 'react';
import { API_URL } from '../lib/config';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_URL}/todos`);
      if (!res.ok) throw new Error('Failed to fetch todos');
      const data = await res.json();
      setTodos(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const createTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      });
      if (!res.ok) throw new Error('Failed to create todo');
      const todo = await res.json();
      setTodos([todo, ...todos]);
      setTitle('');
      setDescription('');
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!res.ok) throw new Error('Failed to update todo');
      const updated = await res.json();
      setTodos(todos.map((t) => (t._id === id ? updated : t)));
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete todo');
      setTodos(todos.filter((t) => t._id !== id));
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (todo) => {
    setEditingId(todo._id);
    setEditTitle(todo.title);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;
    updateTodo(editingId, { title: editTitle });
    setEditingId(null);
    setEditTitle('');
  };

  const toggleComplete = (todo) => {
    updateTodo(todo._id, { completed: !todo.completed });
  };

  if (loading) return <div className="loading">Loading todos...</div>;

  return (
    <div>
      <h1>My Todos</h1>

      <div className="todo-card">
        {error && <div className="error">{error}</div>}

        <form className="todo-form" onSubmit={createTodo}>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        {todos.length === 0 ? (
          <div className="empty-state">No todos yet. Add one above!</div>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo._id} className="todo-item">
                <div className="todo-content">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo)}
                  />
                  {editingId === todo._id ? (
                    <form className="edit-form" onSubmit={saveEdit}>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        autoFocus
                      />
                      <button className="btn-edit" type="submit">
                        Save
                      </button>
                    </form>
                  ) : (
                    <span className={todo.completed ? 'completed' : ''}>
                      {todo.title}
                    </span>
                  )}
                </div>
                {editingId !== todo._id && (
                  <div className="todo-actions">
                    <button className="btn-edit" onClick={() => startEdit(todo)}>
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => deleteTodo(todo._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}