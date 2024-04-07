import { api } from "@/utils/api";
import { useEffect } from "react";
import { useAuth } from "@/utils/auth";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { getUser } = useAuth();
  const navigate = useNavigate();

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
