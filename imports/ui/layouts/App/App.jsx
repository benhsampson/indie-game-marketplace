import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import AuthenticatedRoute from '../../components/AuthenticatedRoute/AuthenticatedRoute';
import PublicRoute from '../../components/PublicRoute/PublicRoute';
import FeaturedGames from '../../pages/FeaturedGames/FeaturedGames';
import GameUpload from '../../pages/GameUpload/GameUpload';
import GameEdit from '../../pages/GameEdit/GameEdit';
import UserSettings from '../../pages/UserSettings/UserSettings';
import Signup from '../../pages/Signup/Signup';
import Login from '../../pages/Login/Login';
import VerifyEmail from '../../pages/VerifyEmail/VerifyEmail';
import RecoverPassword from '../../pages/RecoverPassword/RecoverPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import GameView from '../../pages/GameView/GameView';
import BrowseGames from '../../pages/BrowseGames/BrowseGames';
import Dashboard from '../../pages/Dashboard/Dashboard';
import NotFound from '../../pages/NotFound/NotFound';

const App = props => (
  <Router>
    <div>
      <NavigationBar {...props} />
      <Switch>
        <Route exact name="index" path="/" component={FeaturedGames} />
        <Route exact path="/games" component={BrowseGames} />
        <Route path="/game/:_id" component={GameView} />
        <AuthenticatedRoute path="/games/new" component={GameUpload} {...props} />
        <AuthenticatedRoute path="/game/:_id/edit" component={GameEdit} {...props} />
        <PublicRoute path="/signup" component={Signup} {...props} />
        <Route path="/verify-email/:token" component={VerifyEmail} />
        <PublicRoute path="/login" component={Login} {...props} />
        <Route path="/recover-password" component={RecoverPassword} />
        <Route path="/reset-password/:token" component={ResetPassword} />
        <Route path="/profile/:username" component={Profile} />
        <AuthenticatedRoute path="/user/settings" component={UserSettings} {...props} />
        <AuthenticatedRoute path="/user/dashboard" component={Dashboard} {...props} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default createContainer(() => {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  // const verifed = Meteor.user().emails[0].verified;
  const username = user && user.username;
  const email = user && user.emails && user.emails[0].address;

  return {
    loggingIn,
    // verified,
    authenticated: !loggingIn && !!userId,
    username: username || email,
    // roles: !loading && Roles.getRolesForUser(userId)
  };
}, App);
