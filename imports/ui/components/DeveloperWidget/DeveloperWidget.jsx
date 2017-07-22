import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Loading from '../Loading/Loading';

const profileRoute = username => `/profile/${username}`;

const DeveloperWidget = ({ loading, user }) => (
  <div>
    {loading ? <Loading /> : (<div className="developer-widget">
      <Link to={profileRoute(user.username)}>
        <img
          src={user.profile.profilePicture}
          className="circle responsive-img left"
          height="60"
          width="60"
        />
      </Link>
      <p className="left">
        <Link to={profileRoute(user.username)}>
          <b className="left">{user.username}</b>
        </Link>
        <a className="btn btn-small waves-effect waves-light">
          Follow
          <i className="material-icons left">person_add</i>
        </a>
      </p>
    </div>)}
  </div>
);

DeveloperWidget.propTypes = {
  loading: PropTypes.bool.isRequired,
  // user: PropTypes.object.isRequired
};

export default createContainer(({ username }) => {
  const subscription = Meteor.subscribe('users.profileInfo', username);
  return {
    loading: !subscription.ready(),
    user: Meteor.users.findOne({ username })
  }
}, DeveloperWidget);
