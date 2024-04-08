import { useState } from "react";
import { api } from "@/utils/api";
import { useAuth } from "@/utils/auth";
import { getToken, setToken } from "@/utils/token";

export default function Login() {
  const { getUser } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    api
      .post("/users/login", {
        username,
        password,
      })
      .then((response) => {
        setToken(response.data);
        getUser();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <>
      {getToken()}
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
