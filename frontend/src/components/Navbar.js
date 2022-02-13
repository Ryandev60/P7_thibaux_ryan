import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUserCog } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.assign("/login");
  };

  return (
    <>
      <div className="navbar">
        <FontAwesomeIcon
          icon={faUserCog}
          className="icon__navbar"
          onClick={() => window.location.assign("/setting")}
        ></FontAwesomeIcon>
        <img src="./img/logowhite.png" alt="Logo Groupomania" onClick={() => window.location.assign("/")}/>

        <FontAwesomeIcon
          icon={faSignOutAlt}
          className="icon__navbar"
          onClick={logout}
        ></FontAwesomeIcon>
      </div>
    </>
  );
}

export default Navbar;
