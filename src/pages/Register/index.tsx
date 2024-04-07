import { useEffect } from "react";
import { api } from "@/utils/api";

export default function Register() {
  useEffect(() => {
    api
      .post("/users/register", {
        username: "test",
        password: "test123!",
      })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  });

  return <></>;
}
