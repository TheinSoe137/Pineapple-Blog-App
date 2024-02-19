import React, { useState, useEffect } from "react";
import authService from "../../appwrite/authService";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "../index";
import { login } from "../../redux/authSlice";
import { set, useForm } from "react-hook-form";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();
  const create = async (data) => {
    setError(null);
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser(userData);
        if (userData) {
          dispatch(login(userData));
          navigate("home");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="form">
      <div>
        <h2>Create An Account</h2>
        <p>
          If you already have one,<Link to="/login">Login</Link>
        </p>
        {error && <p>{error}</p>}
      </div>
      <form onSubmit={handleSubmit(create)}>
        <Input
          label="Name"
          placeholder="Enter Name"
          type="text"
          {...register("name", {
            required: true,
          })}
        />
        <Input
          label="Email"
          placeholder="Enter Email"
          type="Enter Email"
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
          {...register("password", {
            required: true,
          })}
        />
        <Button className={"round-btn"} type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
