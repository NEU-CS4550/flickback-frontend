import { useEffect } from "react";
import { api } from "@/utils/api";

export default function Login() {
  useEffect(() => {
    api
      .post("/users/login", {
        username: "test",
        password: "test123!",
      })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  });

  return <></>;
}
