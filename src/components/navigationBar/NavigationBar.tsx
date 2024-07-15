import React, { useState, useRef, useEffect } from "react";
import { RedditIcon, RedditText, UserProfileIcon } from "components/icons";
import CreateButton from "components/ui/button/CreateButton";
import { NavLink } from "react-router-dom";
import { ROUTE_HOME, ROUTE_LOGIN, ROUTE_POST_CREATE } from "constants/WebPath";

const NavigationBar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      <nav>
        <div className="wrapper flex items-center justify-between p-4 mx-auto gap-3">
          <NavLink to={ROUTE_HOME} className="flex items-center gap-2">
            <RedditIcon width="40px" height="40px" />
            <RedditText height="25px" />
          </NavLink>
          <div className="w-full bg-slate-200"></div>
          <div className="flex items-center justify-end gap-3">
            <NavLink to={ROUTE_POST_CREATE}>
              <CreateButton />
            </NavLink>
            <div
              className="flex items-center hover:bg-slate-200 p-2 rounded-lg relative"
              ref={dropdownRef}
            >
              <button onClick={toggleDropdown}>
                <UserProfileIcon className="size-5" />
              </button>
              {/* Dropdown Menu */}
              {isDropdownVisible && (
                <div className="dropdown-content absolute right-2 top-[35px] mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                  <NavLink
                    to={ROUTE_LOGIN}
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    Login
                  </NavLink>
                  {/* Add more dropdown items here */}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
