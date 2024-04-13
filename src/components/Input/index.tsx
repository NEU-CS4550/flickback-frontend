import { ComponentProps } from "react";

import "./styles.css";

interface InputProps extends ComponentProps<"input"> {
  label?: string;
  className?: string;
}

export default function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div className={"Input " + className}>
      <input placeholder="" {...props} />
      <label className="Input__label">{label}</label>
    </div>
  );
}
