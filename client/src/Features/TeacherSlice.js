import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Add a new teacher
export const AddTeachers = createAsyncThunk(
  "teachers/AddTeachers",
  async (teacherData, thunkAPI) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/AddTeachers`, teacherData);
      return response.data.teacher || response.data.product;
    } catch (error) {
      console.error("AddTeachers error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue("Failed to add teacher");
    }
  }
);

// Like teacher
export const liketeachers = createAsyncThunk(
  "teachers/liketeachers",
  async ({ email, useremail }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/liketeachers/${email}`,
        { useremail }
      );
      return response.data.teacher; // matches backend now
    } catch (error) {
      console.error("liketeachers error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue("Failed to like teacher");
    }
  }
);


// Get all teachers
export const getTeachers = createAsyncThunk(
  "teachers/getTeachers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/getTeachers`);
      return response.data.teachers || [];
    } catch (error) {
      console.error("getTeachers error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue("Failed to fetch teachers");
    }
  }
);

// Update teacher
export const updateTeacher = createAsyncThunk("teachers/updateTeacher",
  async ({ email, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/updateTeachers/${email}`, updatedData);
      return response.data.teacher; // must match backend response key
    } catch (error) {
      console.error("updateTeacher error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue("Failed to update teacher");
    }
  }
);


// Delete teacher
export const deleteTeachers = createAsyncThunk(
  "teachers/deleteTeachers",
  async (email, thunkAPI) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API_URL}/deleteTeachers/${email}`);
      console.log("Deleted teacher from backend:", email);
      return email;
    } catch (error) {
      console.error("deleteTeachers error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue("Failed to delete teacher");
    }
  }
);

const initialState = {
  teachers: [],
  status: "idle",
  error: null,
};

const teacherSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddTeachers.fulfilled, (state, action) => {
        state.teachers.unshift(action.payload);
      })
      .addCase(getTeachers.fulfilled, (state, action) => {
        state.teachers = action.payload;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        const index = state.teachers.findIndex(t => t.email === action.payload.email);
        if (index !== -1) {
          state.teachers[index] = action.payload;
        }
      })
      
  builder.addCase(liketeachers.fulfilled, (state, action) => {
    const updatedTeacher = action.payload;
    const index = state.teachers.findIndex(t => t.email === updatedTeacher.email);
    if (index !== -1) {
      state.teachers[index] = updatedTeacher;
    }
  })


      .addCase(deleteTeachers.fulfilled, (state, action) => {
        state.teachers = state.teachers.filter(t => t.email !== action.payload);
      });
  },
});

export default teacherSlice.reducer;
