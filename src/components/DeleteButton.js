import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Confirm, Icon, Popup } from "semantic-ui-react";
import {
  DELETE_COMMENT_MUTATION,
  DELETE_POST_MUTATION,
  DELETE_REPLY_MUTATION,
  DELETE_SPORT_MUTATION,
  FETCH_POSTS_QUERY,
  FETCH_SPORTS_QUERY,
} from "../queries/Quieries";

function DeleteButton({ name, replyId, postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutation = name
    ? DELETE_SPORT_MUTATION
    : replyId
    ? DELETE_REPLY_MUTATION
    : commentId
    ? DELETE_COMMENT_MUTATION
    : DELETE_POST_MUTATION;

  const [deletePostMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId && !name) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data,
        });
      }

      if (callback) callback();
    },
    variables: {
      name,
      postId,
      commentId,
      replyId,
    },
    refetchQueries: [
      name
        ? { query: FETCH_SPORTS_QUERY, variables: { name } }
        : { query: FETCH_POSTS_QUERY },
    ],
  });
  return (
    <>
      <Popup
        content={
          replyId
            ? "Delete reply"
            : commentId
            ? "Delete comment"
            : "Delete post"
        }
        trigger={
          <Icon
            className="trash-icon"
            name="trash"
            color="red"
            size="small"
            onClick={() => setConfirmOpen(true)}
          />
        }
      />
      <Confirm
        content="Are you sure you want to delete post?"
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostMutation}
      />
    </>
  );
}

export default DeleteButton;
