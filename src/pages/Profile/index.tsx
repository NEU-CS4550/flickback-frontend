import { useAuth } from "@/utils/auth";

export default function Profile() {
  const { user } = useAuth();

  return (
    <>
      <h1>{user?.username}</h1>
      {user?.role}
    </>
  );
}
