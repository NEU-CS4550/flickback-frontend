import { useEffect } from "react";
import { useAuth } from "@/utils/auth";
import { clearToken } from "@/utils/token";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const { getUser } = useAuth();

  useEffect(() => {
    clearToken();
    getUser();
    navigate("/login");
  }, []);
  return <></>;
}
