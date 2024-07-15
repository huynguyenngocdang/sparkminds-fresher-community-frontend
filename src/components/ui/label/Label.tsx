import React from "react";
import { ILabelProps } from "types";

const Label: React.FC<ILabelProps> = ({
  children,
  htmlFor = "",
  className = "",
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`inline-block text-sm font-medium cursor-pointer text-text2 ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
