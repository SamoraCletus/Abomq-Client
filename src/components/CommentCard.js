import React, { useContext, useState } from "react";
import { Avatar } from "@material-ui/core";
import moment from "moment";
import { LikeButton } from "./LikeButton";
import { ReplyCommentForm } from "./PostForm";
import { AuthContext } from "../context/auth";
import DeleteButton from "./DeleteButton";
import { Icon, Comment, Card } from "semantic-ui-react";
import ReadMoreReact from "read-more-react/dist/components/ReadMoreReact";
import { Link } from "react-router-dom";

function CommentCard({
  comment: {
    id,
    author,
    username,
    displayName,
    profilePic,
    commentLikes,
    commentLikeCount,
    body,
    replies,
    replyCount,
    createdAt,
  },
  postId,
}) {
  const { user } = useContext(AuthContext);
  const [showReplies, setShowReplies] = useState(false);
  const [openReply, setOpenReply] = useState(false);

  const onClickShowReplies = () => {
    setShowReplies(!showReplies);
  };
  const onClickReplyOpen = () => {
    setOpenReply(!openReply);
  };
  return (
    <Card fluid>
      <Card.Content className="comment-section">
        <div className="comment-content">
          <Link
            to={
              user?.username === username ? `/profile` : `/profile/${username}`
            }
          >
            <Avatar src={profilePic} />
          </Link>
          <div className="comment-body">
            <Link
              to={
                user?.username === username
                  ? `/profile`
                  : `/profile/${username}`
              }
            >
              <h4>{displayName}</h4>
            </Link>
            <Card.Description className="comment-text">
              <ReadMoreReact
                text={body}
                min={10}
                ideal={200}
                max={250}
                readMoreText="See More..."
              />
            </Card.Description>
          </div>
          <div className="comment-body-extra">
            {user && user.username === username && (
              <DeleteButton postId={postId} commentId={id} />
            )}
            {commentLikeCount < 1 ? null : (
              <div className="comment-likes">
                <Icon name="heart" color="purple" />
                {commentLikeCount}
              </div>
            )}
          </div>
        </div>

        <Card.Meta className="comment-bottom">
          {moment(createdAt).fromNow(true)}
          <Comment.Actions>
            <LikeButton
              user={user}
              commentId={id}
              author={author}
              commentLikes={commentLikes}
              postId={postId}
              error
            />
            {user && (
              <Comment.Action onClick={onClickReplyOpen}>Reply</Comment.Action>
            )}
          </Comment.Actions>
        </Card.Meta>
        <ReplyCommentForm
          postId={postId}
          commentId={id}
          author={author}
          openReply={openReply}
        />
        {!showReplies ? (
          replyCount < 1 ? null : (
            <span className="comment-views" onClick={onClickShowReplies}>
              view all {replyCount} replies
            </span>
          )
        ) : (
          <span className="comment-views" onClick={onClickShowReplies}>
            Show less...
          </span>
        )}
      </Card.Content>
      {/* Reply section */}
      {showReplies &&
        replies.map((reply) => (
          <Card.Content key={reply.id} className="reply-section">
            <div className="comment-content">
              <Avatar src={reply.profilePic} />
              <div className="comment-body">
                <h4>{reply.displayName}</h4>
                <Card.Description className="comment-text">
                  {reply.body}
                </Card.Description>
              </div>
              <div className="comment-body-extra">
                {user && user.username === reply.username && (
                  <DeleteButton
                    replyId={reply.id}
                    postId={postId}
                    commentId={id}
                  />
                )}
                {reply.replyLikeCount < 1 ? null : (
                  <div className="comment-likes">
                    <Icon name="heart" color="purple" />
                    {reply.replyLikeCount}
                  </div>
                )}
              </div>
            </div>
            <Card.Meta className="comment-bottom">
              {moment(createdAt).fromNow(true)}
              <Comment.Actions>
                <LikeButton
                  user={user}
                  replyId={reply.id}
                  author={reply.author}
                  commentId={id}
                  postId={postId}
                  replyLikes={reply.replyLikes}
                  error
                />
              </Comment.Actions>
            </Card.Meta>
          </Card.Content>
        ))}
    </Card>
  );
}

export default CommentCard;
