import React from "react";
import { createRoot } from "react-dom/client";

import "./css/layout.css";
import "./css/header.css";
import "./css/post.css";
import "./css/login.css";
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(<App />);
