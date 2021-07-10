import gql from "graphql-tag";
const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      author
      username
      displayName
      verified
      profilePic
      body
      image
      createdAt
      likeCount
      likes {
        id
        username
        displayName
        profilePic
        verified
      }
      commentCount
      comments {
        id
        author
        username
        displayName
        profilePic
        verified
        createdAt
        body
        commentLikeCount
        replyCount
        commentLikes {
          username
          displayName
          verified
        }
        replies {
          id
          author
          username
          displayName
          verified
          profilePic
          createdAt
          body
          replyLikeCount
          replyLikes {
            username
            displayName
            verified
          }
        }
      }
    }
  }
`;
const FETCH_USER_POSTS_QUERY = gql`
  query ($username: String!) {
    getUserPosts(username: $username) {
      id
      author
      body
      image
      createdAt
      username
      displayName
      verified
      profilePic
      likeCount
      likes {
        id
        username
        displayName
        verified
        profilePic
      }
      commentCount
      comments {
        id
        username
        displayName
        profilePic
        verified
        createdAt
        body
        commentLikeCount
        replyCount
        commentLikes {
          username
          displayName
          verified
        }
        replies {
          id
          username
          displayName
          verified
          profilePic
          createdAt
          body
          replyLikeCount
          replyLikes {
            username
            displayName
            verified
          }
        }
      }
    }
  }
`;
const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      author
      body
      image
      createdAt
      username
      verified
      displayName
      profilePic
      likeCount
      likes {
        id
        username
        displayName
        profilePic
        verified
      }
      commentCount
      comments {
        id
        author
        username
        displayName
        profilePic
        verified
        createdAt
        body
        commentLikeCount
        replyCount
        commentLikes {
          username
          displayName
          verified
        }
        replies {
          id
          author
          username
          displayName
          profilePic
          verified
          createdAt
          body
          replyLikeCount
          replyLikes {
            username
            displayName
            verified
          }
        }
      }
    }
  }
`;
const FETCH_USERS_QUERY = gql`
  {
    getUsers {
      id
      username
      displayName
      verified
      profilePic
      bios
      coverPhoto
      createdAt
      followers {
        username
        displayName
        profilePic
        verified
        bios
      }
      followings {
        username
        displayName
        profilePic
        verified
        bios
      }

      followersCount
      followingCount
    }
  }
`;
const FETCH_USER_QUERY = gql`
  query ($username: String!) {
    getUser(username: $username) {
      id
      username
      displayName
      profilePic
      verified
      coverPhoto
      bios
      createdAt
      followers {
        username
        displayName
        profilePic
        verified
        bios
      }
      followings {
        username
        displayName
        profilePic
        verified
        bios
      }
      notifications {
        profilePic
        action
        createdAt
      }
      followersCount
      followingCount
    }
  }
`;
const FETCH_NOTIFICATIONS_QUERY = gql`
  query ($userId: ID!) {
    getNotifications(userId: $userId) {
      id
      notifications {
        profilePic
        action
        createdAt
      }
    }
  }
`;
const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $age: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        age: $age
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!, $image: Upload) {
    createPost(body: $body, image: $image) {
      id
      author
      body
      image
      createdAt
      username
      displayName
      verified
    }
  }
`;
const CREATE_SPORT_POST_MUTATION = gql`
  mutation createSportPost($name: String!, $body: String!, $image: Upload) {
    createSportPost(name: $name, body: $body, image: $image) {
      posts {
        id
        author
        body
        image
        createdAt
        username
      }
    }
  }
`;
const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($image: Upload!) {
    uploadPhoto(image: $image) {
      profilePic
    }
  }
`;
const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($bios: String, $displayName: String, $location: String) {
    editProfile(bios: $bios, displayName: $displayName, location: $location) {
      id
      username
      displayName
      bios
      verified
      profilePic
    }
  }
`;
const FOLLOW_USER_MUTATION = gql`
  mutation followUser($userId: ID!) {
    followUser(userId: $userId) {
      id
      username
      displayName
      profilePic
      verified
    }
  }
`;
const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!, $author: ID!) {
    likePost(postId: $postId, author: $author) {
      id
      likes {
        id
        username
        displayName
        profilePic
        verified
      }
      likeCount
    }
  }
`;
const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        username
        profilePic
        body
        createdAt
        commentLikeCount
      }
    }
  }
`;
const DELETE_REPLY_MUTATION = gql`
  mutation deleteReply($postId: ID!, $commentId: ID!, $replyId: ID!) {
    deleteReply(postId: $postId, commentId: $commentId, replyId: $replyId) {
      id
      comments {
        username
        body
        replies {
          id
          body
          username
          profilePic
          createdAt
        }
      }
    }
  }
`;
const LIKE_COMMENT_MUTATION = gql`
  mutation likeComment($postId: ID!, $commentId: ID!, $author: ID!) {
    likeComment(postId: $postId, commentId: $commentId, author: $author) {
      id
      comments {
        commentLikeCount
        commentLikes {
          username
          displayName
        }
      }
    }
  }
`;
const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: ID!, $body: String!, $author: ID!) {
    createComment(postId: $postId, body: $body, author: $author) {
      id
      comments {
        id
        author
        username
        displayName
        profilePic
        verified
        createdAt
        body
        commentLikeCount
      }
    }
  }
`;
const REPLY_COMMENT_MUTATION = gql`
  mutation ($postId: ID!, $commentId: ID!, $body: String!, $author: ID!) {
    replyComment(
      postId: $postId
      commentId: $commentId
      body: $body
      author: $author
    ) {
      id
      comments {
        id
        replies {
          author
          username
          displayName
          body
        }
      }
    }
  }
`;
const LIKE_REPLY_MUTATION = gql`
  mutation likeReply(
    $postId: ID!
    $commentId: ID!
    $replyId: ID!
    $author: ID!
  ) {
    likeReply(
      postId: $postId
      commentId: $commentId
      replyId: $replyId
      author: $author
    ) {
      id
      comments {
        replies {
          replyLikeCount
          replyLikes {
            username
            displayName
          }
        }
      }
    }
  }
`;
const FETCH_SPORTS_QUERY = gql`
  query ($name: String!) {
    getSports(name: $name) {
      name
      posts {
        id
        author
        username
        profilePic
        body
        image
        createdAt
        likeCount
        likes {
          id
          username
          profilePic
        }
        commentCount
        comments {
          id
          author
          username
          profilePic
          createdAt
          body
          commentLikeCount
          replyCount
          commentLikes {
            username
          }
          replies {
            id
            author
            username
            profilePic
            createdAt
            body
            replyLikeCount
            replyLikes {
              username
            }
          }
        }
      }
    }
  }
`;
const FETCH_SPORT_POST_QUERY = gql`
  query ($name: String!, $postId: ID!) {
    getSportPost(name: $name, postId: $postId) {
      id
      author
      body
      image
      createdAt
      username
      profilePic
      likeCount
      likes {
        id
        username
        profilePic
      }
      commentCount
      comments {
        id
        author
        username
        profilePic
        createdAt
        body
        commentLikeCount
        replyCount
        commentLikes {
          username
        }
        replies {
          id
          author
          username
          profilePic
          createdAt
          body
          replyLikeCount
          replyLikes {
            username
          }
        }
      }
    }
  }
`;
const DELETE_SPORT_MUTATION = gql`
  mutation deleteSportPost($name: String!, $postId: ID!) {
    deleteSportPost(name: $name, postId: $postId)
  }
`;
const LIKE_SPORT_POST_MUTATION = gql`
  mutation likeSportPost($name: String!, $postId: ID!) {
    likeSportPost(name: $name, postId: $postId) {
      name
      posts {
        id
        likes {
          id
          username
          profilePic
        }
        likeCount
      }
    }
  }
`;
const SPORT_COMMENT_MUTATION = gql`
  mutation ($name: String!, $postId: ID!, $body: String!) {
    createSportComment(name: $name, postId: $postId, body: $body) {
      posts {
        id
        comments {
          id
          author
          username
          profilePic
          createdAt
          body
          commentLikeCount
        }
      }
    }
  }
`;

export {
  FETCH_POSTS_QUERY,
  FETCH_USER_POSTS_QUERY,
  FETCH_POST_QUERY,
  FETCH_NOTIFICATIONS_QUERY,
  FETCH_USERS_QUERY,
  FETCH_USER_QUERY,
  FETCH_SPORTS_QUERY,
  FETCH_SPORT_POST_QUERY,
  REGISTER_USER,
  LOGIN_USER,
  UPLOAD_PHOTO_MUTATION,
  EDIT_PROFILE_MUTATION,
  CREATE_POST_MUTATION,
  CREATE_SPORT_POST_MUTATION,
  LIKE_POST_MUTATION,
  LIKE_SPORT_POST_MUTATION,
  DELETE_POST_MUTATION,
  DELETE_SPORT_MUTATION,
  FOLLOW_USER_MUTATION,
  SUBMIT_COMMENT_MUTATION,
  SPORT_COMMENT_MUTATION,
  LIKE_COMMENT_MUTATION,
  LIKE_REPLY_MUTATION,
  REPLY_COMMENT_MUTATION,
  DELETE_COMMENT_MUTATION,
  DELETE_REPLY_MUTATION,
};
