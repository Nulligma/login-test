import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { authActions } from "../features/auth/authSlice";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutUser = (e) => {
    dispatch(authActions.logout());
  };

  return (
    <header
      className="site-header"
      role="banner"
      itemScope
      itemType="http://schema.org/WPHeader"
    >
      <h1
        className="site-title"
        itemScope
        itemType="http://schema.org/Organization"
      >
        10up Blog
      </h1>

      <nav
        className="site-navigation"
        role="navigation"
        itemScope
        itemType="http://schema.org/SiteNavigationElement"
      >
        <a
          href="#menu-main-nav"
          id="js-menu-toggle"
          className="site-menu-toggle"
        >
          <span className="screen-reader-text">Primary Menu</span>
          <span aria-hidden="true">☰</span>
        </a>

        <ul id="menu-main-nav" className="primary-menu">
          <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1912">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1915">
            <NavLink to="/about">About</NavLink>
          </li>
          <li className="logged-out menu-item menu-item-type-custom menu-item-object-custom menu-item-1915">
            {!user ? (
              <NavLink to="/login">Login</NavLink>
            ) : (
              <NavLink to="/login" onClick={logoutUser}>
                Logout
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
