import React, { useContext, useState } from "react";
import moment from "moment";
import { Card, Image, Loader, Modal } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { FETCH_USER_QUERY } from "../queries/Quieries";
import { useQuery } from "@apollo/react-hooks";
import { Button } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { UploadProfilePic } from "../components/Button";
import UserPosts from "../components/UserPosts";
import { Link } from "react-router-dom";
import { EditProfileForm } from "../components/PostForm";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [coverOpen, setCoverOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const { data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      username: user?.username,
    },
  });
  function onClose() {
    setFormOpen(false);
  }
  let userDetails;
  if (!data) {
    userDetails = <Loader />;
  } else {
    const {
      username,
      coverPhoto,
      profilePic,
      bios,
      displayName,
      verified,
      followersCount,
      followingCount,
      createdAt,
    } = data?.getUser;

    userDetails = (
      <>
        <Card fluid className="profile-container">
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
            <Modal.Actions>
              <UploadProfilePic btnName="change cover photo" />
            </Modal.Actions>
          </Modal>

          <Card.Content className="profile-content">
            <hr />
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
              <Modal.Actions>
                <UploadProfilePic />
              </Modal.Actions>
            </Modal>

            <div className="profile-details">
              <div className="display-name-badge">
                <h2>{displayName}</h2>
                {verified ? <VerifiedUserIcon className="user-badge" /> : null}
              </div>
              <p className="user-username">@{username}</p>
              <div className="followers-container">
                <Link to="/followers">
                  <Button className="followers">
                    Followers {followersCount}
                  </Button>
                </Link>
                <Link to="/followings">
                  <Button className="followers">
                    Following {followingCount}
                  </Button>
                </Link>
              </div>
              <Card.Description>{bios}</Card.Description>
              <Card.Meta>
                <span className="date">Joined {moment(createdAt).year()}</span>
              </Card.Meta>
            </div>
          </Card.Content>

          <Card.Content extra className="profile-bottom-items">
            <div className="extra-top">
              <Button>Posts</Button>
              <Button>Media</Button>
              <Button>Likes</Button>

              <Modal
                onClose={() => setFormOpen(false)}
                onOpen={() => setFormOpen(true)}
                open={formOpen}
                size="small"
                trigger={<Button>Edit Profile</Button>}
              >
                <Modal.Content className="edit-profile-modal">
                  <EditProfileForm
                    bios={bios}
                    displayName={displayName}
                    onClose={onClose}
                  />
                </Modal.Content>
              </Modal>
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
