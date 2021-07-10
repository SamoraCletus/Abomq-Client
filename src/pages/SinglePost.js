import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { Card, Grid, Image, Loader, Modal, Popup } from "semantic-ui-react";
import { FETCH_POST_QUERY } from "../queries/Quieries";
import moment from "moment";
import { LikePost } from "../components/LikeButton";
import { CommentForm } from "../components/PostForm";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";
import CommentCard from "../components/CommentCard";

function SinglePost(props) {
  const postId = props.match?.params.postId;
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });
  let postMarkup;
  if (!data) {
    postMarkup = <Loader />;
  } else {
    const {
      id,
      author,
      username,
      displayName,
      verified,
      profilePic,
      body,
      image,
      createdAt,
      comments,
      likes,
      likeCount,
    } = data?.getPost;
    // const newUsername = username.replace(/ /g, "");
    postMarkup = (
      <>
        <Grid.Row className="comment-page">
          <Grid.Column>
            <Card fluid>
              <Card.Content>
                <Link
                  to={user?.username === username ? `/profile` : `/${username}`}
                >
                  <div className="user-details">
                    <Avatar src={profilePic} />
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
                  </div>
                </Link>
                <Card.Description className="post-body">
                  {body}
                </Card.Description>
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

              <Card.Content extra className="post-likes">
                <Link to={`/posts/${id}/likes`}>
                  <Popup
                    content="View likes"
                    trigger={
                      <div className="post-like-count">
                        <span>{likeCount}</span> likes
                      </div>
                    }
                  />
                </Link>
                <LikePost
                  user={user}
                  post={{ id, likeCount, likes }}
                  author={author}
                  error
                />
              </Card.Content>
            </Card>

            {comments.map((comment) => (
              <CommentCard key={comment.id} postId={id} comment={comment} />
            ))}
          </Grid.Column>
        </Grid.Row>

        <CommentForm postId={id} author={author} />
      </>
    );
  }
  return postMarkup;
}

export default SinglePost;
