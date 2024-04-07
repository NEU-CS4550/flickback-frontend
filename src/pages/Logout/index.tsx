import { useEffect } from "react";
import { useAuth } from "@/utils/auth";

export default function Logout() {
  const { getUser } = useAuth();

  useEffect(() => {
    document.cookie += "; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    getUser();
  }, []);
  return <></>;
}
