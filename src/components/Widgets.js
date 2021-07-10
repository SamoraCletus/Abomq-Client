import React from "react";
import { Card, Image } from "semantic-ui-react";
import moment from "moment";
import { Avatar } from "@material-ui/core";
export default function Widgets() {
  return (
    <div className="widgets-container">
      <div className="widget-header">
        <h3>Trending</h3>
      </div>
      <Card fluid className="widget-card">
        <Card.Content style={{ padding: 0 }}>
          <div className="post-content">
            <div className="user-details">
              <Avatar src="" />

              <div className="timestamp">
                <h3>Official App</h3>
                <Card.Meta>{moment().fromNow(true)}</Card.Meta>
              </div>
            </div>

            <Card.Description className="post-body">
              Holla Holla have you heard whats happening Lorem ipsum, dolor
            </Card.Description>
          </div>
          <Image floated="right" size="large" />
        </Card.Content>
      </Card>
      <Card fluid className="widget-card">
        <Card.Content style={{ padding: 0 }}>
          <div className="post-content">
            <div className="user-details">
              <Avatar src="" />

              <div className="timestamp">
                <h3>Official App</h3>
                <Card.Meta>{moment().fromNow(true)}</Card.Meta>
              </div>
            </div>

            <Card.Description className="post-body">
              Holla Holla have you heard whats happening Lorem ipsum, dolor
            </Card.Description>
          </div>
          <Image floated="right" size="large" />
        </Card.Content>
      </Card>
      <Card fluid className="widget-card">
        <Card.Content style={{ padding: 0 }}>
          <div className="post-content">
            <div className="user-details">
              <Avatar src="" />

              <div className="timestamp">
                <h3>Official App</h3>
                <Card.Meta>{moment().fromNow(true)}</Card.Meta>
              </div>
            </div>

            <Card.Description className="post-body">
              Holla Holla have you heard whats happening Lorem ipsum, dolor
            </Card.Description>
          </div>
          <Image floated="right" size="large" />
        </Card.Content>
      </Card>
      <Card fluid className="widget-card">
        <Card.Content style={{ padding: 0 }}>
          <div className="post-content">
            <div className="user-details">
              <Avatar src="" />

              <div className="timestamp">
                <h3>Official App</h3>
                <Card.Meta>{moment().fromNow(true)}</Card.Meta>
              </div>
            </div>

            <Card.Description className="post-body">
              Holla Holla have you heard whats happening Lorem ipsum, dolor
            </Card.Description>
          </div>
          <Image floated="right" size="large" />
        </Card.Content>
      </Card>
      <Card fluid className="widget-card">
        <Card.Content style={{ padding: 0 }}>
          <div className="post-content">
            <div className="user-details">
              <Avatar src="" />

              <div className="timestamp">
                <h3>Official App</h3>
                <Card.Meta>{moment().fromNow(true)}</Card.Meta>
              </div>
            </div>

            <Card.Description className="post-body">
              Holla Holla have you heard whats happening Lorem ipsum, dolor
            </Card.Description>
          </div>
          <Image floated="right" size="large" />
        </Card.Content>
      </Card>
      <Card fluid className="widget-card">
        <Card.Content style={{ padding: 0 }}>
          <div className="post-content">
            <div className="user-details">
              <Avatar src="" />

              <div className="timestamp">
                <h3>Official App</h3>
                <Card.Meta>{moment().fromNow(true)}</Card.Meta>
              </div>
            </div>

            <Card.Description className="post-body">
              Holla Holla have you heard whats happening Lorem ipsum, dolor
            </Card.Description>
          </div>
          <Image floated="right" size="large" />
        </Card.Content>
      </Card>
      <Card fluid className="widget-card">
        <Card.Content style={{ padding: 0 }}>
          <div className="post-content">
            <div className="user-details">
              <Avatar src="" />

              <div className="timestamp">
                <h3>Official App</h3>
                <Card.Meta>{moment().fromNow(true)}</Card.Meta>
              </div>
            </div>

            <Card.Description className="post-body">
              Holla Holla have you heard whats happening Lorem ipsum, dolor
            </Card.Description>
          </div>
          <Image floated="right" size="large" />
        </Card.Content>
      </Card>
    </div>
  );
}
