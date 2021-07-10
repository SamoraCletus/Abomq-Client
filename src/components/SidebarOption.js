import React from "react";
import { Icon, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";

function SidebarOption({ active, text, name, link, tag, sport }) {
  return (
    <Link to={link}>
      {tag ? (
        <Popup
          inverted
          content={tag}
          trigger={
            <div className={`sidebar-option ${active && `sidebar-active`}  `}>
              <Icon name={name} size="large" />
              <h2>{text}</h2>
            </div>
          }
        />
      ) : (
        <div className={`sidebar-option ${active && `sidebar-active`}`}>
          <Icon className="sidebar-icon" name={name} size="large" />
          <h2 style={{ paddingTop: "23px" }}>{text}</h2>
        </div>
      )}
    </Link>
  );
}

export default SidebarOption;
