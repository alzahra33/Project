import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const OwnerRegister = createAsyncThunk("owners/OwnerRegister", async(userData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/OwnerRegister`, {
      email: userData.email,
      password: userData.password
    });
    console.log(response);
    const user = response.user; 
    const msg = response.msg;   
    return { user, msg };
  } catch (error) {
    console.log(error.message);
  }
});
export const OwnerLogin = createAsyncThunk(
  "owners/OwnerLogin",
  async (userData,{rejectWithValue}) => {
    try {
     
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/OwnerLogin`,
        {
          email: userData.email,
          password: userData.password,
        }
      );
      const owners = response.data.user;
      const msg = response.data.msg;
      return { owners, msg };
    } catch (error) {
      //const msg = 'Invalid credentials';
      const msg = error.response.data.msg;
      return rejectWithValue({ msg });
    }
  }
);

// Logout User
export const logout = createAsyncThunk(
  "Owner/logout",
  async () => {
    try {
      //sends a POST request to the server along the request body object
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/logout`);
      const msg = response.data.msg;//retrieve the response from the server
      console.log(msg)
      return {msg}; //return the response from the server as payload to the thunk
    } catch (error) {
      
      const msg = error.message;
      return {msg}
      
    }
  }
);


const initialState = {
  Owner: null,
  status: null,
  msg: null,
  
  isLogin : false,
};

export const OwnerSlice = createSlice({
  name: "Owner", //name of the state
  initialState,
  reducers: {
    // Synchronous actions that update the state directly,
  },




extraReducers: (builder) => {
    //Asynchronous actions that update the state directly,
    builder
      .addCase(OwnerRegister.pending, (state) => {
        state.status =  "loading"
      })
      .addCase(OwnerRegister.fulfilled, (state, action) => {
        state.status =  "success";
        state.Owner = action.payload.Owner;
        state.msg = action.payload.msg;

      })
      .addCase(OwnerRegister.rejected, (state) => {
        state.status =  "rejected";
        state.msg = "Unexpected error is occurred";

      })
      .addCase(OwnerLogin.pending, (state) => {
        state.status =  "loading"
      })
      .addCase(OwnerLogin.fulfilled, (state, action) => {
        state.status =  "success";
        state.Owner = action.payload.Owner;
        state.msg = action.payload.msg;
        state.isLogin= true
      })
      .addCase(OwnerLogin.rejected, (state,action) => {
        state.status =  "rejected";
        state.msg = action.payload.msg
        state.isLogin = false
      })
      .addCase(logout.pending, (state) => {
         state.status =  "loading"
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status =  "success";
        state.Owner = null;
        state.msg = action.payload.msg;
        state.isLogin= false
      })
      .addCase(logout.rejected, (state,action) => {
        state.status =  "rejected";
      })
  },
}); //end of slice

export default OwnerSlice.reducer;