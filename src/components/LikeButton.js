import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useContext, useEffect, useState } from "react";
import { Button, Icon, Label, Popup, Confirm } from "semantic-ui-react";
import { AuthContext } from "../context/auth";

import {
  FETCH_POSTS_QUERY,
  FETCH_USERS_QUERY,
  FETCH_USER_QUERY,
  FOLLOW_USER_MUTATION,
  LIKE_COMMENT_MUTATION,
  LIKE_POST_MUTATION,
  LIKE_REPLY_MUTATION,
} from "../queries/Quieries";

export function LikePost({ user, post: { id, likes, likeCount }, author }) {
  const [liked, setLiked] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user && likes?.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    onError(err) {
      console.log(err);
      setErrors();
    },
    variables: { postId: id, author },
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
          <Button as="div" labelPosition="right" onClick={likePost}>
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
export function LikeButton({
  user,
  replyId,
  commentId,
  postId,
  commentLikes,
  replyLikes,
  author,
}) {
  const [liked, setLiked] = useState(false);
  const [likedReply, setLikedReply] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (replyId) {
      if (user && replyLikes?.find((like) => like.username === user.username)) {
        setLikedReply(true);
      } else setLikedReply(false);
    }
    if (user && commentLikes?.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, commentLikes, replyLikes, replyId]);

  const mutation = replyId ? LIKE_REPLY_MUTATION : LIKE_COMMENT_MUTATION;
  const [likeComment] = useMutation(mutation, {
    onError() {
      setErrors();
    },
    variables: { replyId, postId, commentId, author },
    refetchQueries: [{ query: FETCH_POSTS_QUERY }],
  });

  const likeCommentButton = user
    ? liked || likedReply
      ? "Liked"
      : "Like"
    : null;

  return (
    <>
      {!errors ? (
        <div className="ui error message">
          <ul className="list">
            <li>you must login to like a post</li>
          </ul>
        </div>
      ) : null}
      <span
        onClick={likeComment}
        className="comment-views"
        style={liked || likedReply ? { color: "red" } : { color: "blue" }}
      >
        {likeCommentButton}
      </span>
    </>
  );
}

export function FollowButton({ username }) {
  const [followed, setfollowed] = useState(false);
  const { user } = useContext(AuthContext);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      username: username,
    },
  });
  const id = data?.getUser.id;
  const followers = data?.getUser.followers;
  useEffect(() => {
    if (
      user &&
      followers?.find((follower) => follower.username === user.username)
    ) {
      setfollowed(true);
    } else setfollowed(false);
    setConfirmOpen(false);
  }, [user, followers]);

  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    onError(err) {
      console.log(err);
    },
    variables: { userId: id },
    refetchQueries: [{ query: FETCH_USERS_QUERY }],
  });

  const followButton = user ? (
    followed ? (
      <div>
        <Button
          className="follow-button follow-real"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="bell" size="small" />
          Following
        </Button>
      </div>
    ) : (
      <div>
        <Button className="follow-button follow-basic" onClick={followUser}>
          <Icon name="location arrow" size="small" />
          Follow
        </Button>
      </div>
    )
  ) : null;
  return (
    <>
      <Popup
        content={followed ? "Unfollow" : "Follow"}
        trigger={followButton}
      />
      <Confirm
        content="Do you wish to Unfollow?"
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={followUser}
      />
    </>
  );
}
