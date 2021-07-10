import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";

export default function SportsCard({ image, title }) {
  return (
    <Grid.Column className="grid-column-overide">
      <Link to={`/sports/${title}`}>
        <div className="sports" style={{ backgroundImage: `url(${image})` }}>
          <h4>{title}</h4>
        </div>
      </Link>
    </Grid.Column>
  );
}
