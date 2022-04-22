import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserService, validateUser } from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  isValid: false,
  message: "",
  user: user ? user : null,
};

export const loginUser = createAsyncThunk(
  "auth/fetch",
  async (userData, thunkAPI) => {
    try {
      return await loginUserService(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const validateToken = createAsyncThunk(
  "auth/validate",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await validateUser(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.isValid = false;
      state.message = "";
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.message = "...Please wait";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "Fetch Successfull";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });

    builder
      .addCase(validateToken.pending, (state) => {
        state.isLoading = true;
        state.message = "...Please wait";
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isValid = true;
        state.message = "Token valid";
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isValid = false;
        state.user = null;
        state.message = action.payload;
      });
  },
});

export const authActions = authSlice.actions;
export const auth = authSlice.reducer;
