import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";
import useAuthCheck from "../../hooks/useAuthCheck";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();
  const [modalOpened, setModalOpened] = useState(false);
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const { validateLogin } = useAuthCheck();

  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setModalOpened(true);
      console.log("click");
    }
  };

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container">
        <Link to="/">
          <img src="./logo1.png" alt="logo" width={120} />
        </Link>
        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <NavLink to="/properties" className="navlink">
              Properties
            </NavLink>
            <a href="mailto:Laeeqahmed656@gmail.com" className="navlink">
              Contact
            </a>
            <div onClick={handleAddPropertyClick}>Add Property</div>
            <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />
            {!isAuthenticated ? (
              <button className="button" onClick={loginWithRedirect}>
                Login
              </button>
            ) : (
              <ProfileMenu user={user} logout={logout} />
            )}
          </div>
        </OutsideClickHandler>
        <div className="menu-icon" onClick={() => setMenuOpened((prev) => !prev)}>
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
