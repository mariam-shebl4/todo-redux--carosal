import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: JSON.parse(localStorage.getItem("todos")) || [],
  reducers: {
    // add
    addTask: (state, action) => {
      const newTask = {
        id: Math.random().toString(36).substr(2, 9),
        content: action.payload,
        completed: false,
        createdAt: new Date().toLocaleString(),
      };
      state.push(newTask);
      localStorage.setItem("todos", JSON.stringify(state)); 
    },
    // edit
    editTask: (state, action) => {
      const { id, newContent } = action.payload;
      const taskToEdit = state.find((task) => task.id === id);
      if (taskToEdit) {
        taskToEdit.content = newContent;
      }
      localStorage.setItem("todos", JSON.stringify(state)); 

    },
    // delete
    deleteTask: (state, action) => {
      const taskId = action.payload;
      const updatedTasks = state.filter((task) => task.id !== taskId);
      localStorage.setItem("todos", JSON.stringify(updatedTasks)); 
      return updatedTasks;
    },
    // completed
    markAsCompleted: (state, action) => {
      const taskId = action.payload;
      const taskToComplete = state.find((task) => task.id === taskId);
      if (taskToComplete) {
        // Update the existing task
        taskToComplete.completed = !taskToComplete.completed;
        
        // Update the createdAt timestamp only when marking as completed
        if (taskToComplete.completed) {
          taskToComplete.createdAt = new Date().toLocaleString();
        }
      }
      localStorage.setItem("todos", JSON.stringify(state)); 

    },
  },
});

export const { addTask, editTask, deleteTask, markAsCompleted } =
  tasksSlice.actions;
export default tasksSlice.reducer;
