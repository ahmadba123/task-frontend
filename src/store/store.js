import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "../features/task/taskSlice"
import SearchtaskReducer from "../features/task/taskSlicecopy"

export const store = configureStore({
    reducer: {
        task: taskReducer,
        Searchtask: SearchtaskReducer,

    },
})