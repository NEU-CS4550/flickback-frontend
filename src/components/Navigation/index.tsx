import { LuSearch, LuUser, LuGrip, LuFilm } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AccountDropdown } from "./Dropdown";

import "./styles.css";

export default function Navigation() {
  const location = useLocation();

  const [accountDropdown, showAccountDropdown] = useState(false);
  const [browseDropdown, showBrowseDropdown] = useState(false);

  const hideDropdowns = () => {
    showAccountDropdown(false);
    showBrowseDropdown(false);
  };

  useEffect(() => {
    hideDropdowns();
  }, [location.pathname]);

  return (
    <>
      <div className="Navigation">
        <div className="Navigation__wrapper container">
          {/****** Left side of navigation ******/}
          <div className="Navigation__section">
            <Link
              className="Navigation__logo text-3xl"
              to="/"
              onClick={hideDropdowns}
            >
              <LuFilm className="text-2xl" />
              <div>
                flick<span>back</span>
              </div>
            </Link>
          </div>
          {/****** Right side of navigation ******/}
          <div className="Navigation__section">
            <Link
              className="Navigation__icon text-2xl"
              to="/search"
              onClick={hideDropdowns}
            >
              <LuSearch />
            </Link>
            <div
              className="Navigation__icon text-2xl"
              onClick={() => {
                showBrowseDropdown(!browseDropdown);
                showAccountDropdown(false);
              }}
            >
              <LuGrip />
            </div>
            {/****** Account icon with dropdown ******/}
            <div
              className={
                "Navigation__icon Navigation__account text-2xl" +
                (accountDropdown ? " Navigation__icon--active" : "")
              }
              tabIndex={0}
              onClick={() => {
                showBrowseDropdown(false);
                showAccountDropdown(!accountDropdown);
              }}
            >
              <LuUser />
            </div>
          </div>
          {accountDropdown && <AccountDropdown />}
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
