import React from "react";
import { LoginCTA, SignUpCTA } from "../../index";

function CTAs() {
  return (
    <div className="grid-row-span-2 bg-blur bg-bottom">
      <SignUpCTA />
      <LoginCTA />
    </div>
  );
}

export default CTAs;
