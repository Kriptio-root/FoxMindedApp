import {configureStore} from "@reduxjs/toolkit";

import postsReducer from  '../../modules/posts/postsSlice'
import usersReducer from '../../modules/users/usersSlice'
import todoReducer from  '../../modules/todo/TodoSlice'
import userActivityReducer from '../../modules/userActivity/userActivitySlice'

const store = configureStore({
    reducer: {
        posts:postsReducer,
        users: usersReducer,
        todos: todoReducer,
        tabs:userActivityReducer
    }
})
export default store
