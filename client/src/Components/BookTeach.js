import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

// Async thunk to book a teacher
export const addToBookTeach = createAsyncThunk(
  "Book/addToBookTeach",
  async ({ useremail, teacheremail }, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/bookings`, {
        useremail,
        teacheremail,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Booking failed"
      );
    }
  }
);

// Async thunk to get bookings for a user
export const getBookTeach = createAsyncThunk(
  "Book/getBookTeach",
  async (useremail, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/bookings/${useremail}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch bookings"
      );
    }
  }
);

// Async thunk to remove a booking
export const removeFromBook = createAsyncThunk(
  "Book/removeFromBook",
  async ({ useremail, teacheremail }, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/bookings`, {
        data: { useremail, teacheremail },
      });
      return teacheremail;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to cancel booking"
      );
    }
  }
);

const bookTeachSlice = createSlice({
  name: "bookTeach",
  initialState: {
    bookings: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearBookError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Add to booking
      .addCase(addToBookTeach.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addToBookTeach.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings.push(action.payload);
      })
      .addCase(addToBookTeach.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get bookings
      .addCase(getBookTeach.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getBookTeach.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = action.payload;
      })
      .addCase(getBookTeach.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Remove booking
      .addCase(removeFromBook.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(removeFromBook.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = state.bookings.filter(
          (booking) => booking.teacheremail !== action.payload
        );
      })
      .addCase(removeFromBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearBookError } = bookTeachSlice.actions;
export default bookTeachSlice.reducer;
