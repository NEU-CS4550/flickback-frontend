import { ComponentProps } from "react";
import "./styles.css";

interface ButtonProps extends ComponentProps<"button"> {
  icon?: boolean;
}

export default function Button({ icon, ...props }: ButtonProps) {
  return (
    <button
      className="Button"
      {...props}
      style={icon ? { paddingLeft: "15px" } : {}}
    >
      {props.children}
    </button>
  );
}
