import "./App.css";
import { Header, Footer } from "./assets/index";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/authSlice";
import authService from "./appwrite/authService";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else dispatch(logout());
      })
      .finally(setLoading(false));
  });

  return !loading ? (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  ) : (
    console.log("loding")
  );
}

export default App;
