import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToBookTeach = createAsyncThunk("Book/addToBookTeach", async ({ useremail, teacheremail }) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/addToBookTeach`, { useremail, teacheremail });
  return res.data.cart;
  
});

export const getBookTeach = createAsyncThunk("Book/getBookTeach", async (useremail) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/getBookTeach/${useremail}`);
  return res.data;
});

export const updateteacherQuantity = createAsyncThunk(
  "Book/updateteacherQuantity",
  async ({ useremail, teacheremail, action }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${process.env.REACT_APP_API_URL}/updateteacherQuantity`, {
        useremail,
        teacheremail,
        action,
      });
      return res.data.Book;
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const removeFromBook = createAsyncThunk(
  "Book/removeFromBook",
  async ({ useremail, productemail }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API_URL}/removeFromBook`, {
        data: { useremail, productemail },
      });
      return res.data.Book;
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);




const BookTeachSlice = createSlice({
  name: "Book",
  initialState: {
    Book: null,
    status: "idle",
    error: null, 
  },
  reducers: {
    clearBookError(state) {
      state.error = null; // Reducer to clear error
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToBookTeach.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.error = null; // clear error on success
      })
      .addCase(addToBookTeach.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(updateteacherQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(updateteacherQuantity.rejected, (state, action) => {
        //Handle errors from backend
        state.error = action.error?.message || "Failed to update cart quantity";
      })
      .addCase(removeFromBook.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(removeFromBook.rejected, (state, action) => {
        state.error = action.payload || "Failed to remove Book";
      });
  },
});
export const { clearBookError } = BookTeachSlice.actions;

export default BookTeachSlice.reducer;
