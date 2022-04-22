import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAuthorService } from "./authorService";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  authorMap: {},
};

export const fetchAuthor = createAsyncThunk(
  "author/fetch",
  async (authorURLs, thunkAPI) => {
    try {
      return await fetchAuthorService(authorURLs);
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

const authorSlice = createSlice({
  name: "author",
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
      .addCase(fetchAuthor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAuthor.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.authorMap = { ...state.authorMap, ...action.payload };
      })
      .addCase(fetchAuthor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const authorActions = authorSlice.actions;
export const author = authorSlice.reducer;
