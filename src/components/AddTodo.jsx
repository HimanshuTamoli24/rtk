// AddTodo.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/sliceTodo";

function AddTodo() {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        dispatch(addTodo(input));
        setInput("");
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 p-4 rounded-lg shadow-md">
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none"
                type="text"
                placeholder="Enter a todo..."
            />
            <button type="submit" className="w-full mt-2 p-2 bg-indigo-900 rounded-md hover:bg-blue-500/35">
                Add Todo
            </button>
        </form>
    );
}

export default AddTodo;