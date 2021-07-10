import { Avatar } from "@material-ui/core";
import React from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";

const CommentExampleComment = () => (
  <Comment.Group>
    <Header as="h3" dividing>
      Comments
    </Header>
    <Comment>
      <Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
      <Comment.Content>
        <Comment.Author as="a">{username}</Comment.Author>
        <Comment.Metadata>
          <div>{createdAt}</div>
        </Comment.Metadata>
        <Comment.Text>
          <p>This has been very useful for my research. Thanks as well!</p>
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
    <Form reply>
      <Form.TextArea />
      <Button content="Add Reply" labelPosition="left" icon="edit" primary />
    </Form>
  </Comment.Group>
);

export default CommentExampleComment;

{
  comments.map((comment) => (
    <Card fluid key={comment.id}>
      <Card.Content>
        {user && user.username === comment.username && (
          <DeleteButton postId={id} commentId={comment.id} />
        )}
        <div className="user-details">
          <Avatar src={comment.profilePic} />
          <div className="timestamp">
            <h3>{comment.username}</h3>
            <Card.Meta>{moment(comment.createdAt).fromNow(true)}</Card.Meta>
          </div>
        </div>
        <Card.Description className="post-body">
          {comment.body}
        </Card.Description>
      </Card.Content>
    </Card>
  ));
}
