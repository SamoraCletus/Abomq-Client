import React from "react";
import { Card } from "semantic-ui-react";
import { Avatar } from "@material-ui/core";
import moment from "moment";
import ReadMoreReact from "read-more-react/dist/components/ReadMoreReact";

export default function NotificationCard({ profilePic, action, createdAt }) {
  return (
    <Card fluid className="notification-card">
      <div className="notification-content">
        <div className="user-details">
          <Avatar src={profilePic} />

          <div className="notification-details">
            <Card.Description className="notification-body">
              <ReadMoreReact
                text={action}
                min={10}
                ideal={100}
                max={120}
                readMoreText="See More..."
              />
            </Card.Description>
            <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
          </div>
        </div>
      </div>
    </Card>
  );
}
