import React, { useState } from "react";
import moment from "moment";
import { Card, Image, Loader, Modal } from "semantic-ui-react";
import { FETCH_USER_QUERY } from "../queries/Quieries";
import { useQuery } from "@apollo/react-hooks";
import { Avatar } from "@material-ui/core";
import { Button as MButton } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { FollowButton } from "../components/LikeButton";
import UserPosts from "../components/UserPosts";
import { Link } from "react-router-dom";

export default function SingleProfile(props) {
  const username = props.match?.params.username;
  // const newUsername = username.replace(/ /g, "");
  const [open, setOpen] = useState(false);
  const [coverOpen, setCoverOpen] = useState(false);

  const { data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      username,
    },
  });
  let userDetails;
  if (!data) {
    userDetails = <Loader />;
  } else {
    const {
      profilePic,
      coverPhoto,
      bios,
      username,
      displayName,
      verified,
      followersCount,
      followingCount,
      createdAt,
    } = data?.getUser;
    userDetails = (
      <>
        <Card fluid className="sProfile-container">
          <Modal
            onClose={() => setCoverOpen(false)}
            onOpen={() => setCoverOpen(true)}
            open={coverOpen}
            size="tiny"
            trigger={
              <Image
                className="cover-photo"
                src={coverPhoto}
                wrapped
                ui={false}
              />
            }
          >
            <Modal.Content>
              <Image size="massive" src={coverPhoto} wrapped />
            </Modal.Content>
          </Modal>
          <Card.Content className="sProfile-content">
            <Modal
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              size="tiny"
              trigger={<Avatar src={profilePic} />}
            >
              <Modal.Content image>
                <Image size="massive" src={profilePic} wrapped />
              </Modal.Content>
            </Modal>

            <div className="sProfile-details">
              <div className="display-name-badge">
                <h2>{displayName}</h2>
                {verified ? <VerifiedUserIcon className="user-badge" /> : null}
              </div>

              <p className="user-username">@{username}</p>
              <div className="followers-container">
                <Link to={`/${username}/followers`}>
                  <MButton className="followers">
                    Followers {followersCount}
                  </MButton>
                </Link>
                <Link to={`/${username}/followings`}>
                  <MButton className="followers">
                    Following {followingCount}
                  </MButton>
                </Link>
              </div>
              <Card.Description>{bios}</Card.Description>
              <Card.Meta>
                <span className="date">Joined {moment(createdAt).year()}</span>
              </Card.Meta>
              <div className="sProfile-extra">
                <FollowButton username={username} />
              </div>
            </div>
          </Card.Content>

          <Card.Content extra className="profile-bottom-items">
            <div className="extra-right">
              <MButton>Post</MButton>
              <MButton>About</MButton>
              <MButton>Media</MButton>
              <MButton>Likes</MButton>
              <MButton>More</MButton>
            </div>
          </Card.Content>
        </Card>
        <div className="profile-bottom">
          <Card className="profile-bottom-side-card"></Card>
          <UserPosts username={username} />
        </div>
      </>
    );
  }
  return userDetails;
}
