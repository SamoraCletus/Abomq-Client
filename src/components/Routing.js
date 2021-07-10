import React, { useContext } from "react";
import Home from "../pages/Home";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { SingleLikes } from "../pages/SingleLikes";
import SinglePost from "../pages/SinglePost";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import News from "../pages/News";
import Videos from "../pages/Videos";
import Notifications from "../pages/Notifications";
import Sports from "../pages/Sports";
import Explore from "../pages/Explore";
import More from "../pages/More";
import { LoginRoute } from "../utils/AuthRoute";
import { Redirect, Route, Switch } from "react-router-dom";
import { AuthContext } from "../context/auth";
import SingleProfile from "../pages/SingleProfile";
import {
  Followings,
  Followers,
  UserFollowers,
  UserFollowings,
} from "../pages/Followers";
import Chats from "../pages/Chats";
import SingleSport from "../pages/SingleSport";
import SingleSportPost from "../pages/SingleSportPost";
import Error from "../pages/Error";

function Routing() {
  const { user } = useContext(AuthContext);

  return (
    <div className="app-body">
      <Switch>
        <LoginRoute exact path="/login" component={Login} />
        <LoginRoute exact path="/register" component={Login} />
        <Route exact path="/">
          <div className="main-sidebar">
            <Sidebar />
          </div>
          <div className="main-pages">
            <Home />
          </div>
          <div className="widgets">
            <Widgets />
          </div>
        </Route>

        <Route
          exact
          path="/posts/:postId"
          render={(props) => (
            <>
              <div className="main-sidebar">
                <Sidebar />
              </div>
              <div className="main-pages">
                <SinglePost {...props} />
              </div>
              <div className="widgets">
                <Widgets />
              </div>
            </>
          )}
        />
        <Route
          exact
          path="/posts/:postId/likes"
          render={(props) => (
            <>
              <div className="main-sidebar">
                <Sidebar />
              </div>
              <div className="main-pages">
                <SingleLikes {...props} />
              </div>
              <div className="widgets">
                <Widgets />
              </div>
            </>
          )}
        />
        <Route exact path="/profile">
          {!user ? (
            <Redirect to="/login" />
          ) : (
            <>
              <div className="profile-sidebar">
                <Sidebar />
              </div>
              <div className="pages">
                <Profile />
              </div>
            </>
          )}
        </Route>
        <Route exact path="/chats">
          {!user ? (
            <Redirect to="/login" />
          ) : (
            <>
              <div className="profile-sidebar">
                <Sidebar />
              </div>
              <div className="pages">
                <Chats />
              </div>
            </>
          )}
        </Route>
        <Route exact path="/followers">
          {!user ? (
            <Redirect to="/login" />
          ) : (
            <>
              <div className="profile-sidebar">
                <Sidebar />
              </div>
              <div className="pages">
                <Followers />
              </div>
            </>
          )}
        </Route>
        <Route exact path="/followings">
          {!user ? (
            <Redirect to="/login" />
          ) : (
            <>
              <div className="profile-sidebar">
                <Sidebar />
              </div>
              <div className="pages">
                <Followings />
              </div>
            </>
          )}
        </Route>
        <Route
          exact
          path="/profile/:username"
          render={(props) => (
            <>
              <div className="profile-sidebar">
                <Sidebar />
              </div>
              <div className="pages">
                <SingleProfile {...props} />
              </div>
            </>
          )}
        />
        <Route
          exact
          path="/:username/followers"
          render={(props) => (
            <>
              <div className="profile-sidebar">
                <Sidebar />
              </div>
              <div className="pages">
                <UserFollowers {...props} />
              </div>
            </>
          )}
        />
        <Route
          exact
          path="/:username/followings"
          render={(props) => (
            <>
              <div className="profile-sidebar">
                <Sidebar />
              </div>
              <div className="pages">
                <UserFollowings {...props} />
              </div>
            </>
          )}
        />

        <Route exact path="/news">
          <div className="main-sidebar">
            <Sidebar />
          </div>
          <div className="main-pages">
            <News />
          </div>
          <div className="widgets">
            <Widgets />
          </div>
        </Route>
        <Route exact path="/videos">
          <div className="main-sidebar">
            <Sidebar />
          </div>
          <div className="main-pages">
            <Videos />
          </div>
          <div className="widgets">
            <Widgets />
          </div>
        </Route>
        <Route exact path="/notifications">
          {!user ? (
            <Redirect to="/login" />
          ) : (
            <>
              <div className="main-sidebar">
                <Sidebar />
              </div>
              <div className="main-pages">
                <Notifications />
              </div>
              <div className="widgets">
                <Widgets />
              </div>
            </>
          )}
        </Route>
        <Route exact path="/sports">
          <div className="main-sidebar">
            <Sidebar />
          </div>
          <div className="main-pages">
            <Sports />
          </div>
          <div className="widgets">
            <Widgets />
          </div>
        </Route>
        <Route
          exact
          path="/sports/:sport"
          render={(props) => (
            <>
              <div className="main-sidebar">
                <Sidebar {...props} />
              </div>
              <div className="main-pages">
                <SingleSport {...props} />
              </div>
              <div className="widgets">
                <Widgets />
              </div>
            </>
          )}
        />
        <Route
          exact
          path="/sports/:sport/:postId"
          render={(props) => (
            <>
              <div className="main-sidebar">
                <Sidebar {...props} />
              </div>
              <div className="main-pages">
                <SingleSportPost {...props} />
              </div>
              <div className="widgets">
                <Widgets />
              </div>
            </>
          )}
        />
        <Route
          exact
          path="/sports/:sport/:postId/likes"
          render={(props) => (
            <>
              <div className="main-sidebar">
                <Sidebar {...props} />
              </div>
              <div className="main-pages">
                <SingleLikes {...props} />
              </div>
              <div className="widgets">
                <Widgets />
              </div>
            </>
          )}
        />

        <Route exact path="/explore">
          <div className="main-sidebar">
            <Sidebar />
          </div>
          <div className="main-pages">
            <Explore />
          </div>
          <div className="widgets">
            <Widgets />
          </div>
        </Route>
        <Route exact path="/more">
          <div className="main-sidebar">
            <Sidebar />
          </div>
          <div className="main-pages">
            <More />
          </div>
          <div className="widgets">
            <Widgets />
          </div>
        </Route>
        <Route component={Error} />
      </Switch>
    </div>
  );
}

export default Routing;
