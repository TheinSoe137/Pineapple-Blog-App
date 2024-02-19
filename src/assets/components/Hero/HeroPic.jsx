import React from "react";
import img from "./hero-image.jpg";
function HeroPic() {
  return (
    <div className="hero-pic grid-row-span-3">
      <img src={img} alt="hero" />
    </div>
  );
}
export default HeroPic;
