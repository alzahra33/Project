import { configureStore } from "@reduxjs/toolkit";
import teachersReducer from "../Features/TeacherSlice";
import usersReducer from "../Features/UserSlice"; 
import BookReducer from "../Features/BookTeachSlice"; 
import OwnerReducer from "../Features/OwnerSlice"; 

export const store = configureStore({
  reducer: {
    users: usersReducer,
    teachers: teachersReducer,
    owners:OwnerReducer,
    Book:BookReducer
  },
});
