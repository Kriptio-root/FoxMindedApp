import {createSlice, nanoid, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    posts: [],
    status: 'idle',
    error: null,
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, body, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        body,
                        user: userId,
                    },
                }
            },
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.posts = state.posts.concat(action.payload)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.posts.push(action.payload)
                state.status = 'succeeded'
            })
            .addCase(addNewPost.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

export const {postAdded} = postsSlice.actions
export const selectAllPosts = state => state.posts.posts

export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id == postId)

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const res = await fetch(' https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error(`HTTP error! Status: ${response.status}`)
            })
        return res
    })

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    async newPostData => {
        const res = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: newPostData.postTitle,
                body: newPostData.postContent,
                userId: newPostData.postAuthor,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
        return res
    })

export default postsSlice.reducer
