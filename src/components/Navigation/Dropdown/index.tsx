import {
  LuLogOut,
  LuSettings,
  LuBookmark,
  LuLogIn,
  LuPenSquare,
  LuKeyRound,
} from "react-icons/lu";
import { Link } from "react-router-dom";
import { useAuth } from "@/utils/auth";

import "./styles.css";

export function AccountDropdown({ ...props }) {
  const { user } = useAuth();

  return (
    <div className="Dropdown text-lg w-screen sm:max-w-md" {...props}>
      {user ? (
        <>
          <Link
            className="AccountDropdown__item--user AccountDropdown__item"
            to="/profile"
          >
            <img src={user.pfp} />
            <div>
              <span className="text-2xl">{user.username}</span>
              <div className="text-sm">View Profile</div>
            </div>
          </Link>
          <Link className="AccountDropdown__item" to="/watchlist">
            <LuBookmark className="text-2xl" />
            <span>Watchlist</span>
          </Link>
          {user.role == "ADMIN" && (
            <Link className="AccountDropdown__item" to="/admin">
              <LuKeyRound className="text-2xl" />
              <span>Admin</span>
            </Link>
          )}
          <Link className="AccountDropdown__item" to="/settings">
            <LuSettings className="text-2xl" />
            <span>Settings</span>
          </Link>
          <Link className="AccountDropdown__item" to="/logout">
            <LuLogOut className="text-2xl" />
            <span>Logout</span>
          </Link>
        </>
      ) : (
        <>
          <Link className="AccountDropdown__item" to="/register">
            <LuPenSquare className="text-2xl" />
            <span>Register</span>
          </Link>
          <Link className="AccountDropdown__item" to="/login">
            <LuLogIn className="text-2xl" />
            <span>Login</span>
          </Link>
        </>
      )}
    </div>
  );
}
