import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useAuth } from "@/utils/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { user, getUser } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    api
      .post("/users/login", {
        username,
        password,
      })
      .then((response) => {
        document.cookie = `token=${response.data}; Secure; SameSite=None; Path=/`;
        getUser();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <>
      <input
        className="text-black"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        className="text-black"
        placeholder="******"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={login}>Login</button>
    </>
  );
}
