import { useQuery } from "@apollo/react-hooks";
import { Avatar } from "@material-ui/core";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Loader } from "semantic-ui-react";
import { FollowButton } from "../components/LikeButton";
import { AuthContext } from "../context/auth";
import { FETCH_USER_QUERY } from "../queries/Quieries";

export function Followers() {
  const { user } = useContext(AuthContext);
  const { data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      username: user.username,
    },
  });
  let userFollowers;
  if (!data) {
    userFollowers = <Loader />;
  } else {
    const { followers } = data?.getUser;
    userFollowers = (
      <Card fluid className="followers-page">
        <h3>Followers</h3>
        {followers.map((follower) => (
          <div className="view-followers" key={follower.username}>
            <Link to={`/profile/${follower.username}`}>
              <div className="user-details">
                <Avatar src={follower.profilePic} />
                <div className="follower-name">
                  <h4>{follower.displayName}</h4>
                  <span>{follower.bios}</span>
                </div>
              </div>
            </Link>
            <FollowButton username={follower.username} />
          </div>
        ))}
      </Card>
    );
  }
  return userFollowers;
}
export function Followings() {
  const { user } = useContext(AuthContext);
  const { data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      username: user.username,
    },
  });
  let userFollowings;
  if (!data) {
    userFollowings = <Loader />;
  } else {
    const { followings } = data?.getUser;
    userFollowings = (
      <Card fluid className="following-page">
        <h3>Followings</h3>
        {followings.map((following) => (
          <div className="view-followings" key={following.username}>
            <Link to={`/profile/${following.username}`}>
              <div className="user-details">
                <Avatar src={following.profilePic} />
                <div className="following-name">
                  <h4>{following.displayName}</h4>
                  <span>{following.bios}</span>
                </div>
              </div>
            </Link>
            <FollowButton username={following.username} />
          </div>
        ))}
      </Card>
    );
  }
  return userFollowings;
}
// SingleProfile Followers
export function UserFollowers(props) {
  const { user } = useContext(AuthContext);
  const username = props.match?.params.username;
  const { data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      username: username,
    },
  });
  let userFollower;
  if (!data) {
    userFollower = <Loader />;
  } else {
    const { followers } = data?.getUser;
    userFollower = (
      <Card fluid className="followers-page">
        <h3>Followers</h3>
        {followers.map((follower) => (
          <div className="view-followers" key={follower.username}>
            <Link
              to={
                user?.username === username
                  ? `/profile`
                  : `/profile/${follower.username}`
              }
            >
              <div className="user-details">
                <Avatar src={follower.profilePic} />
                <div className="follower-name">
                  <h4>{follower.displayName}</h4>
                  <span>{follower.bios}</span>
                </div>
              </div>
            </Link>
            {user ? (
              user.username === follower.username ? null : (
                <FollowButton username={follower.username} />
              )
            ) : null}
          </div>
        ))}
      </Card>
    );
  }
  return userFollower;
}

export function UserFollowings(props) {
  const { user } = useContext(AuthContext);
  const username = props.match?.params.username;
  const { data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      username: username,
    },
  });
  let userFollowings;
  if (!data) {
    userFollowings = <Loader />;
  } else {
    const { followings } = data?.getUser;
    userFollowings = (
      <Card fluid className="following-page">
        <h3>Followings</h3>
        {followings.map((following) => (
          <div className="view-followings" key={following.username}>
            <Link
              to={
                user?.username === username
                  ? `/profile`
                  : ` /profile/${following.username}`
              }
            >
              <div className="user-details">
                <Avatar src={following.profilePic} />
                <div className="following-name">
                  <h4>{following.displayName}</h4>
                  <span>{following.bios}</span>
                </div>
              </div>
            </Link>
            {user ? (
              user.username === following.username ? null : (
                <FollowButton username={following.username} />
              )
            ) : null}
          </div>
        ))}
      </Card>
    );
  }
  return userFollowings;
}
