import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBlogService } from "./blogService";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  blogs: [],
};

export const fetchBlog = createAsyncThunk("blog/fetch", async (_, thunkAPI) => {
  try {
    return await fetchBlogService();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const blogSlice = createSlice({
  name: "blog",
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
      .addCase(fetchBlog.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching blogs please wait";
      })
      .addCase(fetchBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Blogs fetched successfully";
        state.blogs = action.payload;
      })
      .addCase(fetchBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.blogs = [];
      });
  },
});

export const blogActions = blogSlice.actions;
export const blog = blogSlice.reducer;
