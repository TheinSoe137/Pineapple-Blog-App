import React, { useId } from "react";

const Input = React.forwardRef(
  ({ label, type = "text", className = "", initialValue, ...props }, ref) => {
    const id = useId();
    return (
      <div className="input-box">
        {label && (
          <label className htmlFor={id}>
            {label}
          </label>
        )}
        <input
          type={type}
          className
          id={id}
          value={initialValue}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);

export default Input;
