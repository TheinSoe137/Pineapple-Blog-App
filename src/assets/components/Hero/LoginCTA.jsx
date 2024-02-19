import React from "react";
import { useNavigate } from "react-router-dom";
function LoginCTA() {
  const navigate = useNavigate();
  return (
    <div className="login-cta cta">
      <button
        onClick={() => {
          navigate("/login");
          console.log("navigated to login");
        }}
        className="cta-btn"
      >
        Log In
      </button>
      <text>Already Have An Account ?</text>
    </div>
  );
}

export default LoginCTA;
