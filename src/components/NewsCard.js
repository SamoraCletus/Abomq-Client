import React from "react";
import { Card, Image } from "semantic-ui-react";

function NewsCard() {
  return (
    <div style={{ marginBottom: "10px" }}>
      <a href="http://facebook.com">
        <Card fluid className="post-card">
          <div className="news-header">
            <Card.Meta>25 Mins ago</Card.Meta>
            <h3>
              Woman looks to the sky wishing the government will come to her
              rescue
            </h3>
          </div>
          <Image
            className="news-img"
            src="https://images.pexels.com/photos/4300986/pexels-photo-4300986.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            wrapped
            ui={false}
          />

          <Card.Content>
            <Card.Description>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Reprehenderit similique officia ratione? Ad, corrupti! Omnis
              reprehenderit cupiditate suscipit natus repudiandae error
              sapiente, tenetur quidem accusantium?
            </Card.Description>
          </Card.Content>
        </Card>
      </a>
    </div>
  );
}

export default NewsCard;
