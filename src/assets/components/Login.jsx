import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as sliceLogin } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/authService";
import { useForm } from "react-hook-form";
import { Input, Button } from "../index";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(sliceLogin(userData));
        navigate("/add-post");
        console.log("navigated to add-post");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="form">
      <div>
        <h2>Sign in to your account</h2>
        <p>
          Don't have any account<Link to="/signup">Sign Up</Link>
        </p>
        {error && <p>{error}</p>}
      </div>
      <form onSubmit={handleSubmit(login)}>
        <Input
          label="Email"
          placeholder="Enter Email"
          type="email"
          initialValue="demo@demo.com"
          {...register("email", {
            required: true,
            validate: {
              matchPattern: (value) =>
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter Password"
          initialValue="12345678"
          {...register("password", {
            required: true,
          })}
        />
        <Button className={"round-btn"} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
