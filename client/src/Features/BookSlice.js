import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create a new booking
export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData, thunkAPI) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/createBooking`,
        bookingData
      );
      return res.data.booking;
    } catch (err) {
      console.error("Create booking error:", err.response?.data || err.message);
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error creating booking"
      );
    }
  }
);

// Get booking history for a user
export const getBookingsByUser = createAsyncThunk(
  "booking/getBookingsByUser",
  async (userId, thunkAPI) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/bookings/${userId}`
      );
      return res.data;
    } catch (err) {
      console.error(
        "Fetch booking history error:",
        err.response?.data || err.message
      );
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error fetching bookings"
      );
    }
  }
);

// Fetch all bookings (admin)
export const fetchAllBookings = createAsyncThunk(
  "booking/fetchAllBookings",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/bookings`
      );
      return res.data;
    } catch (err) {
      console.error("Fetch all bookings error:", err.response?.data || err.message);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch bookings"
      );
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    booking: null,
    bookingHistory: [],
    bookings: [],
    status: "idle",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // createBooking
      .addCase(createBooking.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.booking = action.payload;
        state.status = "succeeded";
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // getBookingsByUser
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

      // fetchAllBookings
      .addCase(fetchAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default bookingSlice.reducer;
