import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for API calls
export const fetchTodos = createAsyncThunk('fetchTodos', async () => {
    const response = await fetch('http://localhost:3000/api/v1/todos');
    const data = await response.json();
    console.log("data", data);
    return data;
});

export const createTodo = createAsyncThunk('createTodo', async (title) => {
    const response = await fetch('http://localhost:3000/api/v1/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });
    const data = await response.json();
    console.log("Adddata", data);
    return data;
});

export const updateTodos = createAsyncThunk('updateTodo', async ({ id, title }) => {
    try {
        console.log("id", "title", id, title);
        const response = await fetch(`http://localhost:3000/api/v1/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title }),
            credentials: "include",
        });
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error(error);
        console.log(error.message);
        throw error;
        
    }
});

export const deleteTodo = createAsyncThunk('deleteTodo', async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/todos/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        console.log(error.message);
        throw error;

    }
});

// Todo slice
const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder
            // Fetch todos
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todos = action.payload ??[];
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Create todo
            .addCase(createTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload.todo);
            })
            // Update todo
            .addCase(updateTodos.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.todos = state.todos.map(todo => todo._id === action.payload._id ? { ...todo, title: action.payload.title } : todo)
            })
            // Delete todo
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo._id !== action.payload._id);
            });
    },
    reducers: {
        // addTodo: (state, action) => {
        //     const todo = {
        //         id: Date.now(),
        //         title: (action.payload),
        //     };
        //     state.todos.push(todo);
        // },

        // removeTodo: (state, action) => {
        //     console.log("action.payload", action.payload);
        //     state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        // },

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
    }
});

export default todoSlice.reducer;

export const { updateTodo } = todoSlice.actions;
