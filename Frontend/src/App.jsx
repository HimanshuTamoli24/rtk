import React from 'react';
import store from './store/store';
import AddTodo from './components/AddTodo';
import { Provider } from 'react-redux';
import Todo from './components/Todo';

function App() {
  return (
    <Provider store={store}>
      <div className='flex justify-center items-center min-h-screen w-full flex-col gap-4 p-4 bg-gray-900 text-gray-100'>
        <h1 className='text-3xl font-bold text-center'>Todo Application</h1>
        <AddTodo />
        <Todo />
      </div>
    </Provider>
  );
}

export default App;
