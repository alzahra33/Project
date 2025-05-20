import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Add a new teacher booking
export const bookTeacher = createAsyncThunk(
  "bookTeach/bookTeacher",
  async ({ userId, teacherId }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/bookTeacher`, {
        userId,
        teacherId,
      });
      return res.data.booking;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to book teacher");
    }
  }
);

// Get bookings for a specific user
export const getUserBookings = createAsyncThunk(
  "bookTeach/getUserBookings",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getBookings/${userId}`);
      return res.data.bookings;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to fetch bookings");
    }
  }
);

// Cancel a booking
export const cancelBooking = createAsyncThunk(
  "bookTeach/cancelBooking",
  async ({ userId, teacherId }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/cancelBooking`, {
        data: { userId, teacherId },
      });
      return res.data.bookings;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to cancel booking");
    }
  }
);

// Initial State
const initialState = {
  bookings: [],
  status: "idle",
  error: null,
};

const bookTeachSlice = createSlice({
  name: "bookTeach",
  initialState,
  reducers: {
    clearBookTeachError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Book teacher
      .addCase(bookTeacher.pending, (state) => {
        state.status = "loading";
      })
      .addCase(bookTeacher.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings.push(action.payload);
        state.error = null;
      })
      .addCase(bookTeacher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get user bookings
      .addCase(getUserBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = action.payload;
        state.error = null;
      })
      .addCase(getUserBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Cancel booking
      .addCase(cancelBooking.pending, (state) => {
        state.status = "loading";
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = action.payload;
        state.error = null;
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearBookTeachError } = bookTeachSlice.actions;
export default bookTeachSlice.reducer;
