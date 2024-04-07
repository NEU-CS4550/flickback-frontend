import { api } from "@/utils/api";
import { useEffect } from "react";
import { useAuth } from "@/utils/auth";

export default function Logout() {
  const { getUser } = useAuth();

  useEffect(() => {
    api
      .post("/users/logout")
      .then(() => {
        getUser();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);
  return <></>;
}
