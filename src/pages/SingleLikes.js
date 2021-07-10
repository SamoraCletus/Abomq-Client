import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { Link } from "react-router-dom";
import { Card, Loader } from "semantic-ui-react";
import { FollowButton } from "../components/LikeButton";
import { AuthContext } from "../context/auth";
import { FETCH_POST_QUERY, FETCH_SPORT_POST_QUERY } from "../queries/Quieries";

export function SingleLikes(props) {
  const name = props.match?.params.sport;
  const postId = props.match?.params.postId;
  const { user } = useContext(AuthContext);
  const mutation = name ? FETCH_SPORT_POST_QUERY : FETCH_POST_QUERY;
  const { data } = useQuery(mutation, {
    variables: {
      postId,
      name,
    },
  });
  let postLikes;
  if (!data) {
    postLikes = <Loader />;
  } else {
    const { likes } = name ? data?.getSportPost : data?.getPost;
    postLikes = (
      <Card fluid className="likes-page">
        <h3>People who liked</h3>
        {likes.map((like) => (
          <div className="view-likes" key={like.id}>
            <Link
              to={
                user?.username === like.username
                  ? `/profile`
                  : `/profile/${like.username}`
              }
            >
              <div className="user-details">
                <Avatar src={like.profilePic} />
                <div className="timestamp">
                  <div className="post-user-details">
                    <div className="display-name-badge">
                      <h3>{like.displayName}</h3>
                      {like.verified ? (
                        <VerifiedUserIcon
                          style={{ fontSize: "medium" }}
                          className="user-badge"
                        />
                      ) : null}
                    </div>
                    <p className="post-username">@{like.username}</p>
                  </div>
                </div>
              </div>
            </Link>
            {user ? (
              user.username === like.username ? null : (
                <FollowButton username={like.username} />
              )
            ) : null}
          </div>
        ))}
      </Card>
    );
  }
  return postLikes;
}
