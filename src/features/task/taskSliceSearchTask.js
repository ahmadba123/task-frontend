import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: []
}
export const taskSlice = createSlice({
    name: 'SearchTask',
    initialState,
    reducers: {
        setSearchTasks: (state, action) => {
            // console.log("pay  ", action.payload)
            state.value = action.payload;
        },

    },
})
// Action creators are generated for each case reducer function
export const { setSearchTasks } = taskSlice.actions
export default taskSlice.reducer
