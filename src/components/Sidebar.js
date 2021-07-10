import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import "semantic-ui-react";
import SidebarOption from "./SidebarOption";

function Sidebar(props) {
  let activeSport = props.match?.params.sport;

  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  const activeName = path ? activeSport : null;
  const handleClick = ({ active }) => setActiveItem(active);
  useEffect(() => {
    if (path) setActiveItem(path);
  }, [path]);

  return (
    <>
      <div className="sidebar">
        <SidebarOption
          active={activeItem === "home"}
          text="Home"
          name="home"
          link="/"
          onClick={handleClick}
        />
        <SidebarOption
          active={activeItem === "profile"}
          text="Profile"
          name="user"
          link="/profile"
          onClick={handleClick}
        />
        <SidebarOption
          active={activeItem === "chats"}
          text="Messages"
          name="envelope"
          link="/chats"
          onClick={handleClick}
        />
        <SidebarOption
          active={activeItem === "notifications"}
          text="Notifications"
          name="bell"
          link="/notifications"
          onClick={handleClick}
        />
        <SidebarOption
          active={activeItem === "news"}
          text="News"
          name="newspaper"
          link="/news"
          onClick={handleClick}
        />
        <SidebarOption
          active={activeItem === "sports" || activeName}
          text="Sports"
          name="basketball ball"
          link="/sports"
          onClick={handleClick}
        />
        <SidebarOption
          active={activeItem === "videos"}
          text="Videos"
          name="video play"
          link="/videos"
          onClick={handleClick}
        />

        <SidebarOption
          active={activeItem === "explore"}
          text="Explore"
          name="globe"
          link="/explore"
          onClick={handleClick}
        />
        <SidebarOption
          active={activeItem === "more"}
          text="More"
          name="ellipsis horizontal"
          link="/more"
          onClick={handleClick}
        />
      </div>
      <div className="mini-sidebar">
        <SidebarOption
          active={activeItem === "home"}
          name="home"
          tag="Home"
          link="/"
          onClick={handleClick}
        />
        <SidebarOption
          active={activeItem === "profile"}
          name="user outline"
          tag="Profile"
          link="/profile"
          onClick={handleClick}
        />
        <SidebarOption
          active={activeItem === "chats"}
          name="envelope outline"
          tag="Messages"
          link="/chats"
          onClick={handleClick}
        />
        <SidebarOption
          active={activeItem === "notifications"}
          name="bell outline"
          tag="Notifications"
          link="/notifications"
          onClick={handleClick}
        />
        <SidebarOption
          active={activeItem === "news"}
          name="newspaper outline"
          tag="News"
          link="/news"
          onClick={handleClick}
        />
        <SidebarOption
          active={activeItem === "sports" || activeName}
          name="volleyball ball"
          tag="Sports"
          link="/sports"
          onClick={handleClick}
        />
        <SidebarOption
          active={activeItem === "videos"}
          name="play circle outline"
          tag="Videos"
          link="/videos"
          onClick={handleClick}
        />

        <SidebarOption
          active={activeItem === "explore"}
          name="globe"
          tag="Explore"
          link="/explore"
          onClick={handleClick}
        />
        <SidebarOption
          active={activeItem === "more"}
          tag="More"
          name="ellipsis horizontal"
          link="/more"
          onClick={handleClick}
        />
      </div>
    </>
  );
}

export default Sidebar;
