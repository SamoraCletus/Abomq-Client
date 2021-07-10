import React, { useContext, useState } from "react";
import { Icon, Loader, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { Avatar } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_USER_QUERY } from "../queries/Quieries";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const { data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      username: user?.username,
    },
  });
  let userDetails;
  if (!data) {
    userDetails = <Loader />;
  } else {
    const { profilePic } = data?.getUser;
    userDetails = <Avatar src={profilePic} />;
  }

  const handleItemClick = (e, { name }) => setActiveItem(name);
  const navBar = user ? (
    <div className="header">
      <Menu className="navbar" pointing secondary size="massive" color="blue">
        <div className="navbar-left">
          {userDetails}
          <Menu.Item
            style={{ paddingLeft: "5px" }}
            name={user.username}
            onClick={handleItemClick}
            as={Link}
            to="/profile"
          />
        </div>

        <Menu.Menu position="right">
          <div className="nav-input">
            <Icon name="search" />
            <input type="text" placeholder="search anything" />
          </div>

          <Menu.Item name="Logout" onClick={logout} />
        </Menu.Menu>
      </Menu>
    </div>
  ) : (
    <div className="header">
      <Menu className="navbar" pointing secondary size="massive" color="blue">
        <Menu.Item name="home" onClick={handleItemClick} as={Link} to="/" />

        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name="register"
            active={activeItem === "register"}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      </Menu>
    </div>
  );

  return navBar;
}
export default Navbar;
