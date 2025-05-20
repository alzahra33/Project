import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addTolist = createAsyncThunk("list/addTolist", async ({ useremail, teacheremail }) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/addTolist`, { useremail, teacheremail });
  return res.data.list;
  
});

export const getlist = createAsyncThunk("list/getlist", async (useremail) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/getlist/${useremail}`);
  return res.data;
});

export const updatelistQuantity = createAsyncThunk(
  "list/updatelistQuantity",
  async ({ useremail, teacheremail, action }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${process.env.REACT_APP_API_URL}/updatelistQuantity`, {
        useremail,
        teacheremail,
        action,
      });
      return res.data.list;
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const removeFromlist = createAsyncThunk(
  "list/removeFromlist",
  async ({ useremail, teacheremail }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API_URL}/removeFromlist`, {
        data: { useremail, teacheremail },
      });
      return res.data.list;
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);




const ListSlice = createSlice({
  name: "list",
  initialState: {
    list: null,
    status: "idle",
    error: null, 
  },
  reducers: {
    clearCartError(state) {
      state.error = null; // Reducer to clear error
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTolist.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.error = null; // clear error on success
      })
      .addCase(getlist.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(updatelistQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(updatelistQuantity.rejected, (state, action) => {
        //Handle errors from backend
        state.error = action.error?.message || "Failed to update list quantity";
      })
      .addCase(removeFromlist.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(removeFromlist.rejected, (state, action) => {
        state.error = action.payload || "Failed to remove teacher";
      });
  },
});
export const { clearlistError } = ListSlice.actions;

export default ListSlice.reducer;
