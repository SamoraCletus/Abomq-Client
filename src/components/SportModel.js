import React, { useContext, useEffect, useState } from "react";
import { LIKE_SPORT_POST_MUTATION } from "../queries/Quieries";
import moment from "moment";
import ReadMoreReact from "read-more-react";
import {
  Button,
  Icon,
  Label,
  Popup,
  Card,
  Image,
  Modal,
} from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";
import { useMutation } from "@apollo/react-hooks";

export function LikeSportPost({ user, post: { id, likes, likeCount }, name }) {
  const [liked, setLiked] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user && likes?.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likeSportPost] = useMutation(LIKE_SPORT_POST_MUTATION, {
    onError(err) {
      console.log(err);
      setErrors();
    },
    variables: { name, postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="purple">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="purple" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as="div" color="purple" basic>
      <Icon name="heart" />
    </Button>
  );
  return (
    <>
      {!errors ? (
        <div className="ui error message">
          <ul className="list">
            <li>you must login to like a post</li>
          </ul>
        </div>
      ) : null}
      <Popup
        content={liked ? "Unlike" : "Like"}
        trigger={
          <Button as="div" labelPosition="right" onClick={likeSportPost}>
            {likeButton}
            <Label basic color="purple">
              {likeCount}
            </Label>
          </Button>
        }
      />
    </>
  );
}

export function SportPostCard({
  name,
  post: {
    body,
    image,
    createdAt,
    id,
    username,
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
                    <h3>Andrew Yang</h3>
                    <VerifiedUserIcon
                      style={{ fontSize: "medium" }}
                      className="user-badge"
                    />
                  </div>
                  <p className="post-username">@{username}</p>
                </div>

                <Card.Meta className="post-time">
                  {moment(createdAt).fromNow(true)}
                </Card.Meta>
              </div>
            </Link>
          </div>
          <Link to={`/sports/${name}/${id}`}>
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
        <LikeSportPost
          user={user}
          post={{ id, likes, likeCount }}
          name={name}
        />
        <Popup
          content="Comment"
          trigger={
            <Button
              labelPosition="right"
              as={Link}
              to={`/sports/${name}/${id}`}
              color="violet"
              basic
              content="Comment"
              icon="comments"
              label={{
                basic: true,
                color: "violet",
                pointing: null,
                content: commentCount,
              }}
            />
          }
        />
        {user && user.username === username && (
          <DeleteButton postId={id} name={name} />
        )}
      </Card.Content>
    </Card>
  );
}
