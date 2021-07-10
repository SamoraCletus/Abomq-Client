import React, { useContext, useState } from "react";
import { Button, Card, Image, Modal, Popup } from "semantic-ui-react";
import moment from "moment";
import ReadMoreReact from "read-more-react";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { LikePost } from "./LikeButton";
import DeleteButton from "./DeleteButton";

export function PostCard({
  post: {
    author,
    body,
    image,
    createdAt,
    id,
    username,
    displayName,
    verified,
    profilePic,
    likeCount,
    likes,
    commentCount,
  },
}) {
  // const newUsername = username.replace(/ /g, "");
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <Card fluid className="post-card">
      <Card.Content style={{ padding: 0 }}>
        <div className="post-content">
          <div className="user-details">
            <Link
              to={
                user?.username === username
                  ? `/profile`
                  : `/profile/${username}`
              }
            >
              <Avatar src={profilePic} />
            </Link>
            <Link
              to={
                user?.username === username
                  ? `/profile`
                  : `/profile/${username}`
              }
            >
              <div className="timestamp">
                <div className="post-user-details">
                  <div className="display-name-badge">
                    <h3>{displayName}</h3>
                    {verified ? (
                      <VerifiedUserIcon
                        style={{ fontSize: "medium" }}
                        className="user-badge"
                      />
                    ) : null}
                  </div>
                  <p className="post-username">@{username}</p>
                </div>

                <Card.Meta className="post-time">
                  {moment(createdAt).fromNow(true)}
                </Card.Meta>
              </div>
            </Link>
          </div>
          <Link to={`/posts/${id}`}>
            <Card.Description className="post-body">
              <ReadMoreReact
                text={body}
                min={10}
                ideal={200}
                max={250}
                readMoreText="See More..."
              />
            </Card.Description>
          </Link>
        </div>

        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          size="tiny"
          trigger={
            <Image
              className="post-img"
              floated="right"
              size="large"
              src={image}
            />
          }
        >
          <Modal.Content image>
            <Image size="massive" src={image} wrapped />
          </Modal.Content>
        </Modal>
      </Card.Content>
      <Card.Content extra>
        <LikePost user={user} post={{ id, likes, likeCount }} author={author} />
        <Popup
          content="Comment"
          trigger={
            <Button
              labelPosition="right"
              as={Link}
              to={`/posts/${id}`}
              color="teal"
              basic
              content="Comment"
              icon="comments"
              label={{
                basic: true,
                color: "teal",
                pointing: null,
                content: commentCount,
              }}
            />
          }
        />
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}
export function UserPostsCard({
  post: {
    author,
    body,
    image,
    createdAt,
    id,
    username,
    displayName,
    verified,
    profilePic,
    likeCount,
    likes,
    commentCount,
  },
}) {
  // const newUsername = username.replace(/ /g, "");
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <Card fluid className="post-card user-post-card">
      <Card.Content style={{ padding: 0 }}>
        <div className="post-content">
          <div className="user-details">
            <Link
              to={
                user?.username === username
                  ? `/profile`
                  : `/profile/${username}`
              }
            >
              <Avatar src={profilePic} />
            </Link>
            <Link
              to={
                user?.username === username
                  ? `/profile`
                  : `/profile/${username}`
              }
            >
              <div className="timestamp">
                <div className="post-user-details">
                  <div className="display-name-badge">
                    <h3>{displayName}</h3>
                    {verified ? (
                      <VerifiedUserIcon
                        style={{ fontSize: "medium" }}
                        className="user-badge"
                      />
                    ) : null}
                  </div>
                  <p className="post-username">@{username}</p>
                </div>

                <Card.Meta className="post-time">
                  {moment(createdAt).fromNow(true)}
                </Card.Meta>
              </div>
            </Link>
          </div>
          <Link to={`/posts/${id}`}>
            <Card.Description className="post-body">
              <ReadMoreReact
                text={body}
                min={10}
                ideal={160}
                max={190}
                readMoreText="See more..."
              />
            </Card.Description>
          </Link>
        </div>

        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          size="tiny"
          trigger={
            <Image
              className="user-post-image"
              floated="right"
              size="large"
              src={image}
            />
          }
        >
          <Modal.Content image>
            <Image size="massive" src={image} wrapped />
          </Modal.Content>
        </Modal>
      </Card.Content>
      <Card.Content extra>
        <LikePost user={user} post={{ id, likes, likeCount }} author={author} />
        <Popup
          content="Comment"
          trigger={
            <Button
              labelPosition="right"
              as={Link}
              to={`/posts/${id}`}
              color="teal"
              basic
              content="Comment"
              icon="comments"
              label={{
                basic: true,
                color: "teal",
                pointing: null,
                content: commentCount,
              }}
            />
          }
        />
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}
