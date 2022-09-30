import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
   todos: [],
   status: 'idle',
   error: null
}

export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync',
    async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos')
           .then((response) => {
              if (response.ok) {
                 return  response.json() ;
           }
       throw new Error(`HTTP error! Status: ${ response.status }`)
    });
        return res
       })

export const addTodoAsync = createAsyncThunk(
    'todos/addTodoAsync',
    async (payload) => {
       const resp = await fetch('https://jsonplaceholder.typicode.com/todos', {
          method: 'POST',
          body: JSON.stringify({
             userID: 1,
             title: payload.title,
             id: nanoid(),
             completed: false,
          }),
          headers: {
             'Content-Type': 'application/json',
          },
       })
       const todo = await resp.json();
       return todo
    })

export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodoAsync',
    async (payload) => {
        const resp = await fetch(`https://jsonplaceholder.typicode.com/todos/${payload.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: payload.id,
            }),
        })
        return payload.id
    })

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                title: action.payload.title,
                completed: false,
            };
            state.todos.push(todo);
        },
        toggleComplete: (state, action) => {
            const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
            state.todos[index].completed = action.payload.completed;
        },
        deleteTodo: (state, action) => {
            return state.todos.todos.filter((todo) => todo.id !== action.payload.id);
        },
    },
       extraReducers(builder) {
          builder
             .addCase(getTodosAsync.pending, (state, action) => {
                state.status = 'loading'
             })
             .addCase(getTodosAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.todos = state.todos.concat(action.payload)
             })
             .addCase(getTodosAsync.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
             })
             .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.todos.push(action.payload);
             })
             .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                 let chk=state.todos.filter((todo) => todo.id !== action.payload);
                 state.todos = chk
             })
       },
});

export const selectAllTodos= state => state.todos.todos

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
