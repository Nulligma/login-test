import { configureStore } from "@reduxjs/toolkit";
import { blog } from "../features/blog/blogSlice";
import { author } from "../features/author/authorSlice";
import { about } from "../features/about/aboutSlice";
import { auth } from "../features/auth/authSlice";

const store = configureStore({ reducer: { auth, blog, author, about } });

export default store;
