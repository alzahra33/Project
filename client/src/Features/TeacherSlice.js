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
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to add teacher");
    }
  }
);

// Like teacher
export const liketeachers = createAsyncThunk(
  "teachers/liketeachers",
  async ({ email, useremail }, thunkAPI) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/liketeachers/${email}`, { useremail });
      return response.data.teacher;
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
      return response.data.teachers || response.data.products;
    } catch (error) {
      console.error("getTeachers error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue("Failed to fetch teachers");
    }
  }
);

// Update teacher
export const updateTeacher = createAsyncThunk(
  "teachers/updateTeacher",
  async ({ email, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/updateTeacher/${email}`, updatedData);
      return response.data.teacher;
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
      await axios.delete(`${process.env.REACT_APP_API_URL}/deleteTeachers/${email}`);
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
      // Add Teacher
      .addCase(AddTeachers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(AddTeachers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teachers.unshift(action.payload);
      })
      .addCase(AddTeachers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Get Teachers
      .addCase(getTeachers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getTeachers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teachers = action.payload;
      })
      .addCase(getTeachers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Like Teacher
      .addCase(liketeachers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(liketeachers.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedTeacher = action.payload;
        const index = state.teachers.findIndex(t => t.email === updatedTeacher.email);
        if (index !== -1) {
          state.teachers[index] = updatedTeacher;
        }
      })
      .addCase(liketeachers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Delete Teacher
      .addCase(deleteTeachers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteTeachers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teachers = state.teachers.filter(t => t.email !== action.payload);
      })
      .addCase(deleteTeachers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Update Teacher
      .addCase(updateTeacher.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedTeacher = action.payload;
        const index = state.teachers.findIndex(t => t.email === updatedTeacher.email);
        if (index !== -1) {
          state.teachers[index] = updatedTeacher;
        }
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default teacherSlice.reducer;
