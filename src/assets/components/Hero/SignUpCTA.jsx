import React from "react";
import { useNavigate } from "react-router-dom";

function SignUpCTA() {
  const navigate = useNavigate();
  return (
    <div className="signup-cta cta">
      <text>Create An Account</text>
      <button
        onClick={() => {
          navigate("/signup");
          console.log("navigated to signup");
        }}
        className="cta-btn"
      >
        Sign Up
      </button>
    </div>
  );
}

export default SignUpCTA;
