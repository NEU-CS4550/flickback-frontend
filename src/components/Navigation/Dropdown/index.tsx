import { LuLogOut, LuSettings, LuBookmark } from "react-icons/lu";
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
            <span className="text-2xl">{user.username}</span>
            <div className="text-sm">View Profile</div>
          </Link>
          <Link className="AccountDropdown__item" to="/watchlist">
            <LuBookmark className="text-2xl" />
            <span>Watchlist</span>
          </Link>
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
            <LuBookmark className="text-2xl" />
            <span>Register</span>
          </Link>
          <Link className="AccountDropdown__item" to="/login">
            <LuSettings className="text-2xl" />
            <span>Login</span>
          </Link>
        </>
      )}
    </div>
  );
}
