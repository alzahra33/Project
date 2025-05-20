import { configureStore } from "@reduxjs/toolkit";
import teachersReducer from "../Features/TeacherSlice";
import usersReducer from "../Features/UserSlice"; 

export const store = configureStore({
  reducer: {
    users: usersReducer,
    teachers: teachersReducer,
  },
});
