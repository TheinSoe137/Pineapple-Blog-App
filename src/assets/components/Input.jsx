import React, { useId } from "react";

const Input = React.forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className="input-box">
        {label && (
          <label className htmlFor={id}>
            {label}
          </label>
        )}
        <input type={type} className id={id} {...props} ref={ref} />
      </div>
    );
  }
);

export default Input;
