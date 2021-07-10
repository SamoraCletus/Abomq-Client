import React, { useContext } from "react";
import MoreCard from "../components/MoreCard";
import { AuthContext } from "../context/auth";
export default function More() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="more-page">
      <h3 className="page-header">More</h3>
      <MoreCard
        icon="setting"
        color="black"
        title="Settings & Privacy"
        details="adjust your settings here"
        link="#"
      />
      <MoreCard
        icon="users"
        color="teal"
        title="Communities"
        details="join the conversation in our communities"
        link="#"
      />
      <MoreCard
        icon="add user"
        color="blue"
        title="Invite a Friend"
        details="invite a friend to join the conversation"
        link="#"
      />
      <MoreCard
        icon="adversal"
        color="brown"
        title="Advertisement"
        details="learn about our advertisement policies"
        link="#"
      />
      <MoreCard
        icon="help"
        color="green"
        title="Help & Support"
        details="learn about our communities standard and policies"
        link="#"
      />
      <MoreCard
        icon="lock"
        color="red"
        title={user ? `Logout` : `Register & Login`}
        onclick={logout}
        link="/login"
        details=""
      />
    </div>
  );
}
