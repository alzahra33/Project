import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Add a new teacher
export const AddTeachers = createAsyncThunk( "teachers/AddTeachers",async (teacherData) => {
  console.log(`teacherData${teacherData}`);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/AddTeachers`,
        {
          name: teacherData.name,
          email: teacherData.email,
          phoneNumber: teacherData.phoneNumber,
          subject: teacherData.subject,
          coursePrice: teacherData.coursePrice,
          imageUrl: teacherData.imageUrl,
        }
      );
  
    const product = response.data.product;
    return product; //Return the new post to Redux
  } catch (error) {
    console.log(error);
  }
});

// Like teacher
export const liketeachers = createAsyncThunk("teachers/liketeachers", async (teacherData, thunkAPI) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/liketeachers/${teacherData.email}`,
      { useremail: teacherData.useremail }
    );
    return response.data.teachers;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("Failed to like teacher");
  }
});

// Get all teachers
export const getTeachers = createAsyncThunk("teachers/getTeachers", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getTeachers`);
    return response.data.products;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("Failed to fetch teachers");
  }
});

// Update teacher
export const updateTeacher = createAsyncThunk(
  "teachers/updateTeacher",
  async ({ email, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/updateTeacher/${email}`, updatedData);
      return response.data.teachers;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to update teacher");
    }
  }
);

// Delete teacher
export const deleteTeachers = createAsyncThunk("teachers/deleteTeachers", async (email, thunkAPI) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}/deleteTeachers/${email}`);
    return email;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to delete teacher");
  }
});

const initialState = {
  teachers: [],
  status: null,
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
      })
      .addCase(AddTeachers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teachers.unshift(action.payload); // <-- Use correct data shape
      })
      .addCase(AddTeachers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Get Teachers
      .addCase(getTeachers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTeachers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teachers = action.payload;
      })
      .addCase(getTeachers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Like Teacher
      .addCase(liketeachers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(liketeachers.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedIndex = state.teachers.findIndex(t => t._id === action.payload._id);
        if (updatedIndex !== -1) {
          state.teachers[updatedIndex].likes = action.payload.likes;
        }
      })
      .addCase(liketeachers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete Teacher
      .addCase(deleteTeachers.fulfilled, (state, action) => {
        state.teachers = state.teachers.filter(t => t._id !== action.payload);
      })

      // Update Teacher
      .addCase(updateTeacher.fulfilled, (state, action) => {
        const index = state.teachers.findIndex(t => t._id === action.payload._id);
        if (index !== -1) {
          state.teachers[index] = action.payload;
        }
      });
  },
});

export default teacherSlice.reducer;
