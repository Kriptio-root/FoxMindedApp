import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    users: [],
    status: 'idle',
    error: null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const res=await fetch(' https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error(`HTTP error! Status: ${ response.status }`)
        });
    return res;
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
            state.status = 'loading'
        })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.users = state.users.concat(action.payload)
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectUserById = (state,userId) => state.users.users.find(user => user.id == userId)

export const selectAllUsers = state => state.users.users

export default usersSlice.reducer