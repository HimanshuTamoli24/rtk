import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, updateTodos, deleteTodo } from "../features/todo/sliceTodo";

function Todo() {
    const todos = useSelector((state) => state.AllTodoStore.todos?.todos) ?? [];
    const { status, error } = useSelector((state) => state.AllTodoStore);
    const dispatch = useDispatch();
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");

    const handleUpdate = (id, currentTitle) => {
        setEditId(id);
        setEditText(currentTitle);
    };
    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch])

    const saveUpdate = (id) => {
        dispatch(updateTodos({ id, title: editText }));
        setEditId(null);
    };

    return (
        <div className="w-full max-w-md bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-center mb-2">Todo List</h2>
            <button className="border-amber-50 border bg-amber-100/30 hover:bg-amber-100/10 text-xl text-center w-full" >fetch todo</button>
            {todos.length === 0 ? (
                <p className="text-gray-400 text-center">No todos available</p>
            ) : (
                <ul className="space-y-2">
                    {todos.map((todo) => (
                        <li key={todo._id} className="flex justify-between items-center p-2 bg-gray-700 rounded-md">

                            {editId === todo._id ? (
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
                                {editId === todo._id ? (
                                    <button onClick={() => saveUpdate(todo._id)} className="bg-gray-500 px-2 py-1 rounded-md">
                                        Save
                                    </button>
                                ) : (
                                    <button onClick={() => handleUpdate(todo._id, todo.title)} className="bg-gray-500 px-2 py-1 rounded-md">
                                        Edit
                                    </button>
                                )}
                                <button onClick={() => dispatch(deleteTodo(todo._id))} className="bg-red-600 px-2 py-1 rounded-md">
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>


            )}
            {status === "loading" && <p>Loading...</p>}
            {error && <p className="text-red-500">{error.message}</p>}
        </div>
    );
}

export default Todo;
