import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { Card, Grid, Loader } from "semantic-ui-react";
import { FETCH_USER_POSTS_QUERY } from "../queries/Quieries";
import { UserPostsCard } from "./PostCard";

function UserPosts({ username }) {
  const { data } = useQuery(FETCH_USER_POSTS_QUERY, {
    variables: {
      username,
    },
  });
  let userPosts;
  if (!data) {
    userPosts = <Loader />;
  } else {
    userPosts = (
      <Card className="user-posts-card">
        {data.getUserPosts.map((post) => (
          <Grid.Column key={post.id} style={{ marginBottom: "10px" }}>
            <UserPostsCard user={username} post={post} author={post.author} />
          </Grid.Column>
        ))}
      </Card>
    );
  }
  return userPosts;
}

export default UserPosts;
