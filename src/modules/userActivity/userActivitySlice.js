import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    tabs: [
        {id: 1, name: 'albums'},
        {id: 2, name: 'todos'},
        {id: 3, name: 'posts'},
    ],
    currentTab: {id: 1, name: 'Albums'},
    content:[],
    status: 'idle',
    error: null
}

export const fetchActivityData = createAsyncThunk(
    'tabs/fetchActivityData',
    async (args) => {
        let tabIndex=args[0]
        let userId=args[1]
        let link
             if(tabIndex==1){
                 link= ` https://jsonplaceholder.typicode.com/users/${userId}/albums`
        }else if (tabIndex==2){
                 link= ` https://jsonplaceholder.typicode.com/users/${userId}/todos`
        }else {
                 link= ` https://jsonplaceholder.typicode.com/users/${userId}/posts`
        }
        console.log(link)
        const res = await fetch(link)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error(`HTTP error! Status: ${response.status}`)
            });
        return res;
    })

const userActivitySlice = createSlice({
    name: 'tabs',
    initialState,
    reducers: {
        tabSelected: {
            reducer(state, action) {
                state.currentTab.id = action.payload.id
                state.currentTab.name = action.payload.name
                state.status='idle'
            }
        },
        userMap: {
            reducer(state, action) {
                let curTab =[...state.tabs]
                curTab = curTab.filter((curTab) =>curTab.name == action.payload)
                state.currentTab.id = curTab[0].id
                state.currentTab.name = curTab[0].name
            }
            },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchActivityData.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(fetchActivityData.fulfilled, (state, action) => {
                state.content=[]
                state.content.push(action.payload)
                state.status = 'succeeded'
            })
            .addCase(fetchActivityData.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})


export const {tabSelected} = userActivitySlice.actions
export const {userMap} = userActivitySlice.actions

export const selectTabById = (state, tabId) => state.tabs.tabs.find(tab => tab.id == tabId)

export const selectAllTabs = state => state.tabs.tabs

export default userActivitySlice.reducer