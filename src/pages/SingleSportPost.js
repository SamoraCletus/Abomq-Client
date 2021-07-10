import React, { useContext, useState } from "react";
import { FETCH_SPORT_POST_QUERY } from "../queries/Quieries";
import { useQuery } from "@apollo/react-hooks";
import { Avatar } from "@material-ui/core";
import { Card, Grid, Image, Loader, Modal, Popup } from "semantic-ui-react";
import moment from "moment";
import { CommentForm } from "../components/PostForm";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";
import CommentCard from "../components/CommentCard";
import { LikeSportPost } from "../components/SportModel";

function SingleSportPost(props) {
  const postId = props.match?.params.postId;
  const name = props.match?.params.sport;
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const { data } = useQuery(FETCH_SPORT_POST_QUERY, {
    variables: {
      name,
      postId,
    },
  });
  let postMarkup;
  if (!data) {
    postMarkup = <Loader />;
  } else {
    const {
      id,
      username,
      profilePic,
      body,
      image,
      createdAt,
      comments,
      likes,
      likeCount,
    } = data?.getSportPost;
    // const newUsername = username.replace(/ /g, "");
    postMarkup = (
      <>
        <Grid.Row className="comment-page">
          <Grid.Column>
            <Card fluid>
              <Card.Content>
                <Link
                  to={
                    user?.username === username
                      ? `/profile`
                      : `/profile/${username}`
                  }
                >
                  <div className="user-details">
                    <Avatar src={profilePic} />
                    <div className="timestamp">
                      <div className="post-user-details">
                        <h3>Andrew Yang</h3>
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
                <Link to={`/sports/${name}/${id}/likes`}>
                  <Popup
                    content="View likes"
                    trigger={
                      <div className="post-like-count">
                        <span>{likeCount}</span> likes
                      </div>
                    }
                  />
                </Link>
                <LikeSportPost
                  user={user}
                  post={{ id, likes, likeCount }}
                  name={name}
                />
              </Card.Content>
            </Card>

            {comments.map((comment) => (
              <CommentCard key={comment.id} postId={id} comment={comment} />
            ))}
          </Grid.Column>
        </Grid.Row>
        <CommentForm name={name} postId={id} />
      </>
    );
  }
  return postMarkup;
}

export default SingleSportPost;
