import React, { useId } from "react";

const SSelect = React.forwardRef(
  ({ options, label, className, ...props }, ref) => {
    const id = useId();
    return (
      <div className={`${className}`}>
        {label && <label htmlFor={id}></label>}
        <select {...props} id={id} ref={ref}>
          {options
            ? options.map((option) => {
                return (
                  <option key={option} value={option}>
                    {option}
                  </option>
                );
              })
            : null}
        </select>
      </div>
    );
  }
);

export default SSelect;
