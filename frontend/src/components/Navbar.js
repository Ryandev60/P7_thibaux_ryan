import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.assign("/login");
  };

  return (
    <div>
      <div className="navbar">
        <img src="./img/logowhite.png" alt="Logo Groupomania" />

        <FontAwesomeIcon
          icon={faSignOutAlt}
          className="icon"
          onClick={logout}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
}

export default Navbar;
