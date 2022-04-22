import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./app/store";
import { Home, About, Login } from "./pages";

function App() {
  return (
    <React.StrictMode>
      <HelmetProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path={"/"} element={<Home />} />
              <Route path={"/about"} element={<About />} />
              <Route path={"/login"} element={<Login />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </HelmetProvider>
    </React.StrictMode>
  );
}

export default App;
