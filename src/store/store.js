import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/sliceTodo";

const store = configureStore({
    reducer: {
        AllTodoStore: todoReducer,  
    },
});

export default store;
