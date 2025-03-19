// AddTodo.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "../features/todo/sliceTodo";

function AddTodo() {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.AllTodoStore);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        dispatch(createTodo(input));
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
            <button disabled={status === 'loading'}
                type="submit" className="w-full mt-2 p-2 bg-indigo-900 rounded-md hover:bg-blue-500/35">
                {status === 'loading' ? "Adding..." : "Add Todo"}
                {error === true ? <h1>error</h1> : null}
            </button>
        </form>
    );
}

export default AddTodo;