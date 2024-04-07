import { useEffect } from "react";
import { api } from "@/utils/api";

export default function Profile() {
  useEffect(() => {
    api
      .get("/users/profile")
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  return <></>;
}
