import "./styles.css";

export default function Button(props: any) {
  return (
    <div
      className="Button"
      {...props}
      style={props.icon ? { paddingLeft: "15px" } : {}}
    >
      {props.children}
    </div>
  );
}
