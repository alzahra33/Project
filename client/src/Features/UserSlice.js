import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const UserRegister = createAsyncThunk("users/UserRegister", async(userData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/UserRegister`, {
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




export const UserLogin = createAsyncThunk(
  "users/UserLogin",
  async (userData,{rejectWithValue}) => {
    try {
     
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/UserLogin`,
        {
          email: userData.email,
          password: userData.password,
        }
      );
      const users = response.data.user;
      const msg = response.data.msg;
      return { users, msg };
    } catch (error) {
      //const msg = 'Invalid credentials';
      const msg = error.response.data.msg;
      return rejectWithValue({ msg });
    }
  }
);


export const getuser = createAsyncThunk("post/getuser", async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/getuser`);
    return response.data.posts;
   } catch (error) {
    console.log(error);
  }
});


// Logout User
export const logout = createAsyncThunk(
  "users/logout",
  async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/logout`);
      const msg = response.data.msg
      console.log(msg)
      return { msg }
    }
    catch (err) { }
  })


const initialState = {
  user: null,
  status: null,
  msg: null,
  isLogin: false,
};

export const UserSlice = createSlice({
  name: "users", // name of the state
  initialState,  // initial value of the state
  reducers: {},  // Handling synchronous Operations
  extraReducers: (builder) => {
    
    builder
      .addCase(UserRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UserRegister.fulfilled, (state, action) => {
        state.status = "success"; 
        state.user = action.payload.user;
        state.msg = action.payload.msg;
      })
      .addCase(UserRegister.rejected, (state) => {
        state.status = "rejected"; 
        state.msg = "Unexpected error occurred";
      })

      .addCase(UserLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
        state.isLogin = true;
        state.user = action.payload.user;
        state.msg = action.payload.msg;
      })
      .addCase(UserLogin.rejected, (state,action) => {
        state.isError = true;
        state.isLogin = false;
        state.user = null;
        state.msg = action.payload.msg;
      })
      .addCase(logout.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
              state.isLogin = false;
              state.user = null;
              state.msg = action.payload.msg;          
            })
            .addCase(logout.rejected, (state) => {
              state.isError = true
            });
              
  }, // Handling asynchronous Operations
});


export default UserSlice.reducer;
