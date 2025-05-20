import { configureStore } from "@reduxjs/toolkit";
import teachersReducer from "../Features/TeacherSlice";
import usersReducer from "../Features/UserSlice"; 
import postReducer from "../Features/PostSlice"; 

export const store = configureStore({
  reducer: {
    users: usersReducer,
    teachers: teachersReducer,
    posts: postReducer,
  },
});
