// TodoList.js
import React, { useState } from 'react';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    const addTodo = () => {
        if (task) {
            setTodos([...todos, task]);
            setTask('');
        }
    };

    return (
        <div>
            <h1>Todo List</h1>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>{todo}</li>
                ))}
            </ul>
            <input value={task} onChange={e => setTask(e.target.value)} />
            <button onClick={addTodo}>Add Todo</button>
        </div>
    );
}

export default TodoList;
