import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon } from "semantic-ui-react";

export default function MoreCard({
  icon,
  title,
  details,
  color,
  link,
  onclick,
}) {
  return (
    <Card fluid className="more-card" onClick={onclick}>
      <Link to={link}>
        <div className="more-title">
          <Icon size="big" color={color} name={icon} />
          <h3>{title}</h3>
        </div>
        <p>{details}</p>
      </Link>
    </Card>
  );
}
