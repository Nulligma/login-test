import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAboutService } from "./aboutService";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  about: "",
};

export const fetchAbout = createAsyncThunk(
  "about/fetch",
  async (_, thunkAPI) => {
    try {
      return await fetchAboutService();
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

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbout.pending, (state) => {
        state.isLoading = true;
        state.message = "...Please wait";
      })
      .addCase(fetchAbout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.about = action.payload;
        state.message = "Fetch Successfull";
      })
      .addCase(fetchAbout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const aboutActions = aboutSlice.actions;
export const about = aboutSlice.reducer;
