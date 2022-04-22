import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Head, Navbar } from "../components";
import { loginUser, authActions } from "../features/auth/authSlice";

export default function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (authState.isSuccess) {
      navigate("/");
    }

    return () => {
      dispatch(authActions.reset());
    };
  }, [authState, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((old) => ({ ...old, [e.target.name]: e.target.value }));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData));
  };

  return (
    <>
      <Head type="Login" />
      <Navbar />
      <h1>Login</h1>

      {authState.isLoading ? (
        <div>Please wait</div>
      ) : (
        <div className="login">
          <form method="post" onSubmit={onSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                value={formData.username}
                onChange={onChange}
                id="username"
                type="text"
                name="username"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                value={formData.password}
                onChange={onChange}
                id="password"
                type="password"
                name="password"
              />
            </div>
            <div>
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      )}
    </>
  );
}
