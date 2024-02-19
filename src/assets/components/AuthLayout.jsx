import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    // if (authStatus === false) {
    //   navigate("/login");
    //   console.log("nav from authlayout to login");
    // }
    // setLoading(false);
    if (authentication && authStatus !== authentication) {
      navigate("/login");
      console.log("nav from authlayout to login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
      console.log("navigate from authlayout is called to blank");
    }
    setLoading(false);
  }, [authStatus, navigate, authentication]);

  return loading ? <h1>Loading...</h1> : <>{children}</>;
}
