import React, { forwardRef } from "react";

const Button = forwardRef(function Button({ className = "", children, ...props }, ref) {
  return (
    <button ref={ref} className={className} {...props}>
      {children}
    </button>
  );
});

export { Button }; 