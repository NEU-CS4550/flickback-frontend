import { useEffect } from "react";
import { useAuth } from "@/utils/auth";
import { clearToken } from "@/utils/token";

export default function Logout() {
  const { getUser } = useAuth();

  useEffect(() => {
    clearToken();
    getUser();
  }, []);
  return <></>;
}
