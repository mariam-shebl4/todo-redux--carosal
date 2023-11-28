import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./ReduxSlice"; // Import your ReduxSlice file

const Store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default Store;