import React from "react";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { useNavigate } from 'react-router-dom';
import { login } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { userLogin } from "../apis/user";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault()
    const email = e.target.elements.Email.value;
    const password = e.target.elements.Password.value;
    const { userId, username } = await userLogin({ email, password })
    dispatch(login({ userId, username }))
    navigate('/')
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleLogin}>
              <div className="my-3">
                <label htmlFor="display-4">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  name="Email"
                  placeholder="name@example.com"
                />
              </div>
              <div className="my-3">
                <label htmlFor="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  name="Password"
                  placeholder="Password"
                />
              </div>
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
