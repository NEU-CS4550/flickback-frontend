import {
  LuSearch,
  LuUser,
  LuLogOut,
  LuSettings,
  LuGrip,
  LuBookmark,
} from "react-icons/lu";
import { Link } from "react-router-dom";
import { useState } from "react";

import "./styles.css";

export default function Navigation() {
  const [accountDropdown, showAccountDropdown] = useState(false);

  return (
    <>
      <div className="Navigation">
        <div className="Navigation__wrapper container">
          {/****** Left side of navigation ******/}
          <div className="Navigation__section">
            <Link className="Navigation__logo text-3xl" to="/">
              flick<span>back</span>
            </Link>
          </div>
          {/****** Right side of navigation ******/}
          <div className="Navigation__section">
            <Link className="Navigation__icon text-2xl" to="/search">
              <LuSearch />
            </Link>
            <Link className="Navigation__icon text-2xl" to="/search">
              <LuGrip />
            </Link>
            {/****** Account icon with dropdown ******/}
            <div
              className={
                "Navigation__icon Navigation__account text-2xl" +
                (accountDropdown ? " Navigation__icon--active" : "")
              }
              tabIndex={0}
              onClick={() => {
                showAccountDropdown(!accountDropdown);
              }}
              onBlur={() => {
                //showAccountDropdown(false);
              }}
            >
              <LuUser />
              {accountDropdown && (
                <div className="Navigation__account__dropdown text-lg w-screen max-w-sm">
                  <Link
                    className="Navigation__account--user Navigation__account__item"
                    to="/profile"
                  >
                    <span className="text-2xl">kennybc</span>
                    <div className="text-sm">View Profile</div>
                  </Link>
                  <Link className="Navigation__account__item" to="/watchlist">
                    <LuBookmark className="text-2xl" />
                    <span>Watchlist</span>
                  </Link>
                  <Link className="Navigation__account__item" to="/settings">
                    <LuSettings className="text-2xl" />
                    <span>Settings</span>
                  </Link>
                  <Link className="Navigation__account__item" to="/logout">
                    <LuLogOut className="text-2xl" />
                    <span>Logout</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {accountDropdown && (
        <div
          className="Navigation__blur"
          onClick={() => {
            showAccountDropdown(false);
          }}
        ></div>
      )}
    </>
  );
}
