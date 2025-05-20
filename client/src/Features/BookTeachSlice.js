import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create a new booking
export const createBook = createAsyncThunk(
  "book/createBook",
  async (bookData, thunkAPI) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/createBook`, bookData);
      return res.data.book;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error placing booking");
    }
  }
);

// Get bookings by user
export const getBookingsByUser = createAsyncThunk(
  "book/getBookingsByUser",
  async (useremail, thunkAPI) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/book/${useremail}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error fetching bookings");
    }
  }
);

// Admin: Fetch all bookings
export const fetchAllBookings = createAsyncThunk(
  "book/fetchAllBookings",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/book`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch bookings");
    }
  }
);

const bookTeachSlice = createSlice({
  name: "book",
  initialState: {
    booking: null,
    status: "idle",
    error: null,
    bookingHistory: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Booking
      .addCase(createBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.booking = action.payload;
        state.status = "succeeded";
      })
      .addCase(createBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Get Bookings By User
      .addCase(getBookingsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookingsByUser.fulfilled, (state, action) => {
        state.bookingHistory = action.payload;
        state.loading = false;
      })
      .addCase(getBookingsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Fetch All Bookings
      .addCase(fetchAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.booking = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default bookTeachSlice.reducer;
