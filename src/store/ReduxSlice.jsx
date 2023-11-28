import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push({
        id: Math.random().toString(36).substr(2, 9),
        content: action.payload,
        completed: false,
      });
    },
    editTask: (state, action) => {
      const { id, newContent } = action.payload;
      const taskToEdit = state.find((task) => task.id === id);
      if (taskToEdit) {
        taskToEdit.content = newContent;
      }
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      return state.filter((task) => task.id !== taskId);
    },
    markAsCompleted: (state, action) => {
        const taskId = action.payload;
        const taskToComplete = state.find((task) => task.id === taskId);
        if (taskToComplete) {
          taskToComplete.completed = !taskToComplete.completed;
  
          // Add a new task with createdAt timestamp
          state.push({
            id: Math.random().toString(36).substr(2, 9),
            content: taskToComplete.content,
            completed: false,
            createdAt: new Date().toLocaleString(),
          });
        }},
  },
});

export const { addTask, editTask, deleteTask, markAsCompleted } =
  tasksSlice.actions;
export default tasksSlice.reducer;
