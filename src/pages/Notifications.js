import React, { useContext } from "react";
import { Loader } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_NOTIFICATIONS_QUERY } from "../queries/Quieries";
import NotificationCard from "../components/NotificationCard";

function Notifications() {
  const { user } = useContext(AuthContext);
  const { data } = useQuery(FETCH_NOTIFICATIONS_QUERY, {
    variables: {
      userId: user?.id,
    },
  });

  let userNotifications;
  if (!data) {
    userNotifications = <Loader />;
  } else {
    const { notifications } = data.getNotifications;
    let sortedNotifications = notifications.sort(
      (createdAt) => (createdAt = -1)
    );
    userNotifications = sortedNotifications.map((note) => (
      <NotificationCard
        key={note.createdAt}
        profilePic={note.profilePic}
        action={note.action}
        createdAt={note.createdAt}
      />
    ));
  }
  return (
    <div className="notifications-page">
      <h3>Notifications</h3>
      {userNotifications}
    </div>
  );
}
export default Notifications;
