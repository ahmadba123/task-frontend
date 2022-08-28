import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: []
}


export const taskSlice = createSlice({
    name: 'SearchTask',
    initialState,
    reducers: {
        // addTask: (state, action) => {
        //     console.log("before:", state.value);
        //     state.value = [...state.value, action.payload];
        //     console.log("after:", state.value);

        // },
        // addTasks: (state, action) => {
        //     state.value = [...state.value, ...action.payload]
        // },
        // setTasks: (state, action) => {
        //     state.value = action.payload;
        // },
        setSearchTasks: (state, action) => {
            // console.log("pay  ", action.payload)
            state.value = action.payload;
        },

    },
})



// Action creators are generated for each case reducer function
export const { setSearchTasks } = taskSlice.actions


export default taskSlice.reducer
