import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import authService from "../../appwrite/authService";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        throw error;
      });
  };
  return (
    <button
      onClick={logoutHandler}
      className
    >
      Log Out
    </button>
  );
}

export default LogoutBtn;
