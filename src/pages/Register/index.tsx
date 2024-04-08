import { useState } from "react";
import { api } from "@/utils/api";
import { useAuth } from "@/utils/auth";
import { setToken } from "@/utils/token";

export default function Register() {
  const { getUser } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    api
      .post("/auth/register", {
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
      <button onClick={login}>Register</button>
    </>
  );
}
