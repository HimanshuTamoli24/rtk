import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


const createTodo = createAsyncThunk("createTodo", async (title) => {
    try {
        const data = await fetch("https://reacttodobackend-3pyu.onrender.com/api/v1/todos", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title })
        })
        const response = await data.json()
        return response
    } catch (error) {
        console.error(error)
        return { error: 'Failed to create todo' }

    }



})
const editTodo = createAsyncThunk("editTodo", async ({ title, id }) => {
    try {
        const data = await fetch(`https://reacttodobackend-3pyu.onrender.com/api/v1/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title })
        })
        const response = await data.json()
        return response

    } catch (error) {
        console.error(error)
        return { error: 'Failed to edit todo' }

    }
})
const deleteTodo = createAsyncThunk("deleteTodo", async (id) => {
    try {
        const data = await fetch(`https://reacttodobackend-3pyu.onrender.com/api/v1/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await data.json()
        console.log("response", response);
        return id


    } catch (error) {
        console.error(error)
        return { error: 'Failed to delete todo' }

    }
})
const fetchTodo = createAsyncThunk("fetchTodo", async () => {
    try {
        const data = await fetch("https://reacttodobackend-3pyu.onrender.com/api/v1/todos")
        const response = await data.json()
        return response.todos || []

    } catch (error) {
        console.error(error)
        return { error: 'Failed to fetch todos' }

    }

})

const initialState = {
    todos: [],
    status: 'idle',
    error: null
}
const todoSlice = createSlice({
    name: "todo",
    initialState,
    extraReducers: (builder) => {
        // create todo
        builder.addCase(createTodo.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(createTodo.rejected, (state) => {
            state.status = 'failed'
            state.error = true
        })
        builder.addCase(createTodo.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.todos = [...state.todos, action.payload.todo]
        })
        // edit todo
        builder.addCase(editTodo.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(editTodo.rejected, (state) => {
            state.status = 'failed'
            state.error = true
        })
        builder.addCase(editTodo.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.todos = state.todos.map(todo => todo._id === action.payload.todo._id ? { ...todo, title: action.payload.todo.title } : todo)
        })
        // delete todo
        builder.addCase(deleteTodo.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(deleteTodo.rejected, (state) => {
            state.status = 'failed'
            state.error = true
        })
        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.todos = state.todos.filter(todo => todo._id !== action.payload)
        })
        // fetch todos
        builder.addCase(fetchTodo.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(fetchTodo.rejected, (state) => {
            state.status = 'failed'
            state.error = true
        })
        builder.addCase(fetchTodo.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.todos = action.payload
        })
    }

})
export {
    createTodo,
    editTodo,
    deleteTodo,
    fetchTodo,
}
export default todoSlice.reducer