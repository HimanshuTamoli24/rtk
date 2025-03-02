import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/sliceTodo";

function Todo() {
    const todos = useSelector((state) => state.AllTodoStore.todos) ?? [];
    const dispatch = useDispatch();
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");

    const handleUpdate = (id, currentTitle) => {
        setEditId(id);
        setEditText(currentTitle);
    };

    const saveUpdate = (id) => {
        dispatch(updateTodo({ id, title: editText }));
        setEditId(null);
    };

    return (
        <div className="w-full max-w-md bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-center mb-2">Todo List</h2>
            {todos.length === 0 ? (
                <p className="text-gray-400 text-center">No todos available</p>
            ) : (
                <ul className="space-y-2">
                    {todos.map((todo) => (
                        <li key={todo.id} className="flex justify-between items-center p-2 bg-gray-700 rounded-md">
                            {editId === todo.id ? (
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="w-full bg-gray-600 p-1 rounded-md text-white"
                                />
                            ) : (
                                <span className="text-white">{todo.title}</span>
                            )}
                            <div className="flex space-x-2">
                                {editId === todo.id ? (
                                    <button onClick={() => saveUpdate(todo.id)} className="bg-gray-500 px-2 py-1 rounded-md">
                                        Save
                                    </button>
                                ) : (
                                    <button onClick={() => handleUpdate(todo.id, todo.title)} className="bg-gray-500 px-2 py-1 rounded-md">
                                        Edit
                                    </button>
                                )}
                                <button onClick={() => dispatch(removeTodo(todo.id))} className="bg-red-600 px-2 py-1 rounded-md">
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Todo;
