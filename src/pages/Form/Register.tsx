import { useState } from "react";
import { api } from "@/utils/api";
import { useAuth } from "@/utils/auth";
import { setToken } from "@/utils/token";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "@/utils/alert";
import Button from "@/components/Button";
import Input from "@/components/Input";

import "./styles.css";

export default function Register() {
  const navigate = useNavigate();
  const { getUser } = useAuth();
  const { alert } = useAlert();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const register = () => {
    api
      .post("/auth/register", {
        username,
        password,
        role: isAdmin ? "ADMIN" : "USER",
      })
      .then((response) => {
        if (response.data.type == "success") {
          setToken(response.data.token);
          getUser();
          navigate(-1);
          alert("success", "Welcome to FlickBack, " + username + "!");
        } else {
          alert(response.data.type, response.data.message);
        }
      });
  };

  return (
    <div className="Register">
      <div className="Form">
        <span className="Form__label">Register</span>
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
          className="mb-2"
          name="password"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          autoComplete="off"
        />
        <label className="Form__checkbox">
          <input
            type="checkbox"
            onChange={(e) => {
              setIsAdmin(e.target.checked);
            }}
            style={{ marginBottom: "30px" }}
          />
          <div></div>
          <span>Grant admin privileges? </span>
        </label>
        <Button onClick={register}>Register</Button>
        <span className="Form__switch">
          Already have an account? <Link to="/login">LOGIN</Link>
        </span>
      </div>
    </div>
  );
}
