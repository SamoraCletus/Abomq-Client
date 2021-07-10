import React, { useContext, useRef, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Card, Comment, Form, Image } from "semantic-ui-react";
import {
  CREATE_POST_MUTATION,
  CREATE_SPORT_POST_MUTATION,
  FETCH_POSTS_QUERY,
  FETCH_USERS_QUERY,
  FETCH_SPORTS_QUERY,
  REPLY_COMMENT_MUTATION,
  SPORT_COMMENT_MUTATION,
  SUBMIT_COMMENT_MUTATION,
  EDIT_PROFILE_MUTATION,
} from "../queries/Quieries";
import { Avatar } from "@material-ui/core";
import "react-image-crop/dist/ReactCrop.css";
import { UploadButton, UploadProfilePic } from "../components/Button";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";

export function PostForm({ name }) {
  const { user } = useContext(AuthContext);
  const [values, setValues] = useState({ body: "", image: undefined, name });
  const [errors, setErrors] = useState({});
  const [viewImage, setViewImage] = useState(undefined);

  const mutation = name ? CREATE_SPORT_POST_MUTATION : CREATE_POST_MUTATION;
  const [createPost] = useMutation(mutation, {
    onError() {
      setErrors();
    },
    variables: values,
    update(proxy) {
      if (!name) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
        values.body = "";
      }
    },
    refetchQueries: [
      name
        ? { query: FETCH_SPORTS_QUERY, variables: { name } }
        : { query: FETCH_POSTS_QUERY },
      { query: FETCH_USERS_QUERY },
    ],
  });

  const onChange = (e) => {
    let value = e.target.value;
    setValues({ ...values, [e.target.name]: value });
  };

  const onFileChange = (e) => {
    let image = e.target.files[0];
    setValues({ ...values, [e.target.name]: image });
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = function () {
        setViewImage(reader.result);
      };
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createPostCallback();
  };
  function createPostCallback() {
    createPost();
    setValues({ body: "", image: undefined, name });
    setViewImage(undefined);
  }
  return (
    <>
      <div className="post-form">
        <Avatar src={user.profilePic} />
        <div className="post-form-input">
          <input
            type="text"
            placeholder="What are you thinking about..."
            name="body"
            onChange={onChange}
            value={values.body}
          />
        </div>

        <UploadButton name="image" onChange={onFileChange} btnName="photo" />
        <Button
          className="form-btn"
          type="submit"
          color="purple"
          size="tiny"
          onClick={onSubmit}
          disabled={values.body ? false : true}
        >
          Submit
        </Button>
      </div>
      {viewImage ? (
        <div className="view-image">
          <Image src={viewImage} />
        </div>
      ) : null}

      {!errors ? (
        <div className="ui error message">
          <ul className="list">
            <li>Cannot submit an empty post please write a post </li>
          </ul>
        </div>
      ) : null}
    </>
  );
}

export function CommentForm({ name, postId, author }) {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});
  const commentInputRef = useRef(null);
  const mutation = name ? SPORT_COMMENT_MUTATION : SUBMIT_COMMENT_MUTATION;
  const [submitComment] = useMutation(mutation, {
    onError(err) {
      console.log(err);
      setErrors();
    },
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      name,
      postId,
      author,
      body: comment,
    },
    refetchQueries: [
      name
        ? { query: FETCH_SPORTS_QUERY, variables: { name } }
        : { query: FETCH_POSTS_QUERY },
    ],
  });
  return (
    <>
      {!errors ? (
        <div className="ui error message">
          <ul className="list">
            <li>Cannot submit an empty comment please write a comment </li>
          </ul>
        </div>
      ) : null}
      {user && (
        <Card fluid>
          <Card.Content className="comment-form">
            <div className="comment-form-bottom">
              <Avatar src={user.profilePic} />

              <div className="post-form-input">
                <Form onSubmit={submitComment}>
                  <Form.Field>
                    <input
                      type="text"
                      placeholder=" write a comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      ref={commentInputRef}
                    />
                  </Form.Field>
                </Form>
              </div>

              <button
                type="submit"
                className="ui button purple"
                disabled={comment.trim() === ""}
                onClick={submitComment}
              >
                Submit
              </button>
            </div>
          </Card.Content>
        </Card>
      )}
    </>
  );
}

export function ReplyButton({ user }) {
  const [openReply, setOpenReply] = useState(false);

  const onClickReplyOpen = () => {
    setOpenReply(!openReply);
  };
  return (
    user && <Comment.Action onClick={onClickReplyOpen}>Reply</Comment.Action>
  );
}
export function ReplyCommentForm({ postId, commentId, openReply, author }) {
  const [reply, setReply] = useState("");
  const [errors, setErrors] = useState({});
  const replyInputRef = useRef(null);

  const [replyComment] = useMutation(REPLY_COMMENT_MUTATION, {
    onError() {
      setErrors();
    },
    update() {
      setReply("");
      replyInputRef.current.blur();
    },
    variables: {
      postId,
      commentId,
      author,
      body: reply,
    },
    refetchQueries: [{ query: FETCH_POSTS_QUERY }],
  });

  return (
    <>
      {!errors ? (
        <div className="ui error message">
          <ul className="list">
            <li>Cannot submit an empty reply </li>
          </ul>
        </div>
      ) : null}
      {openReply && (
        <Card fluid>
          <Card.Content className="comment-form">
            <div className="comment-form-bottom">
              <div className="post-form-input">
                <Form onSubmit={replyComment}>
                  <Form.Field>
                    <input
                      type="text"
                      placeholder=" write a comment"
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      ref={replyInputRef}
                    />
                  </Form.Field>
                </Form>
              </div>

              <button
                type="submit"
                className="ui button purple"
                disabled={reply.trim() === ""}
                onClick={replyComment}
              >
                Submit
              </button>
            </div>
          </Card.Content>
        </Card>
      )}
    </>
  );
}

export function EditProfileForm({ displayName, bios, location, onClose }) {
  const { onChange, onSubmit, values } = useForm(editProfileCallback, {
    displayName,
    bios,
    location,
  });
  const [editProfile] = useMutation(EDIT_PROFILE_MUTATION, {
    onError(err) {
      console.log(err);
    },
    variables: values,
  });
  function editProfileCallback() {
    editProfile();
    onClose();
  }
  return (
    <Card fluid className="edit-profile-card">
      <Form onSubmit={onSubmit}>
        <h4>Display Name</h4>
        <input
          onChange={onChange}
          name="displayName"
          value={values.displayName}
        />
        <h4>Bio</h4>
        <input onChange={onChange} name="bios" value={values.bios} />
        <h4>Location</h4>
        <input
          placeholder="Australia"
          onChange={onChange}
          name="location"
          value={values.location}
        />
        <div className="edit-profile-bottom">
          <UploadProfilePic />
          <Button className="form-btn" type="submit" color="purple" size="mini">
            Save Change
          </Button>
        </div>
      </Form>
    </Card>
  );
}
