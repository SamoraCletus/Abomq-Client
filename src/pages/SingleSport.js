import { useQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";
import { Grid, Loader, Transition } from "semantic-ui-react";
import { PostForm } from "../components/PostForm";
import { SportPostCard } from "../components/SportModel";
import { AuthContext } from "../context/auth";
import { FETCH_SPORTS_QUERY } from "../queries/Quieries";

export default function SingleSport(props) {
  const name = props.match?.params.sport;

  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_SPORTS_QUERY, {
    variables: {
      name: name,
    },
  });

  return (
    <div className="sport-page">
      <h1>{name}</h1>
      <Grid columns={1}>
        <Grid.Row className="sport-row">
          {user && (
            <Grid.Column>
              <PostForm name={name} />
            </Grid.Column>
          )}
          {loading ? (
            <Loader />
          ) : (
            <Transition.Group>
              {data &&
                data?.getSports.posts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: "10px" }}>
                    <SportPostCard post={post} name={name} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
}
