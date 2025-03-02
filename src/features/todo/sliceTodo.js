import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [
        {
            id: 1,
            title: "Hello cuties"
        }
    ],
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: Date.now(),
                title: (action.payload),
            };
            state.todos.push(todo);
        },

        removeTodo: (state, action) => {
            console.log("action.payload", action.payload);
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },

        // updateTodo: (state, action) => {
        //     state.todos = state.todos.map((todo) =>
        //         todo.id === action.payload.id
        //             ? { ...todo, title: action.payload.title }
        //             : todo
        //     );
        // },
        updateTodo: (state, action) => {
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload.id
                        ? { ...todo, title: action.payload.title }
                        : todo
                ),
            };
        },

    },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
