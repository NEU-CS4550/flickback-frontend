import { useState } from "react";
import { api } from "@/utils/api";
import { useAuth } from "@/utils/auth";
import { setToken } from "@/utils/token";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "@/utils/alert";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function Login() {
  const navigate = useNavigate();
  const { getUser } = useAuth();
  const { alert } = useAlert();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    api
      .post("/auth/login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.type == "success") {
          setToken(response.data.token);
          getUser();
          navigate(-1);
          alert("success", "Welcome back, " + username + "!");
        } else {
          alert(response.data.type, response.data.message);
        }
      });
  };

  return (
    <div className="Login">
      <div className="Form">
        <span className="Form__label">Login</span>
        <Input
          name="username"
          label="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          autoComplete="off"
        />
        <Input
          name="password"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          autoComplete="off"
        />
        <Button onClick={login}>Login</Button>
        <span className="Form__switch">
          Don't have an account yet? <Link to="/register">REGISTER</Link>
        </span>
      </div>
    </div>
  );
}
