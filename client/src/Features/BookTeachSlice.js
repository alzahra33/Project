import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const createBook = createAsyncThunk(
  "Book/createBook",
  async (BoookData, thunkAPI) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/createBook`, BoookData);
      return res.data.Book;
    } catch (err) {
      console.error("Create Book error:", err.response?.data || err.message);
      return thunkAPI.rejectWithValue(err.response?.data || "Error placing Book");
    }
  }
);

// Get order history for a user
export const getBookbyuser = createAsyncThunk(
  "Book/getBookbyuser",
  async (useremail, thunkAPI) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/Book/${useremail}`);
      return res.data;
    } catch (err) {
      console.error("Fetch Book history error:", err.response?.data || err.message);
      return thunkAPI.rejectWithValue(err.response?.data || "Error fetching orders");
    }
  }
);


// Async thunk to fetch all orders for admin
export const fetchAllOBook = createAsyncThunk(
  'Book/fetchAllOBook',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/Book`); // updated route
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch Book');
    }
  }
);


const BookTeachSlice = createSlice({
  name: "Book",
  initialState: {
    Book: null,
    status: "idle",
    error: null,
    Book: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.Book = action.payload;
        state.status = "succeeded";
      })
      .addCase(createBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(getBookbyuser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookbyuser.fulfilled, (state, action) => {
        state.BookHistory = action.payload;
        state.loading = false;
      })
      .addCase(getBookbyuser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })



      .addCase(fetchAllOBook.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchAllOBook.fulfilled, (state, action) => {
      state.Book = action.payload;
      state.loading = false;
    })
    .addCase(fetchAllOBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    });
      
  },
});

export default BookTeachSlice.reducer;
