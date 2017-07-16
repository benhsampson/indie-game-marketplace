import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Loading from '../Loading/Loading';

const handleProfileNav = username => `/profile/${username}`;

const ProfileCell = ({ loading, user }) => {
  return loading ? <Loading /> : (
    <div className="col s12 m6 l4">
      <div className="profile-cell card z-depth-2 hoverable left">
        <Link to={handleProfileNav(user.username)}>
          <img src={user.profile.profilePicture} width="60" height="60" className="circle left" />
        </Link>
        <div className="card-content left">
          <Link to={handleProfileNav(user.username)}>
            <span className="card-title grey-text text-darken-3">{user.username}</span>
          </Link>
          {user && user.profile.bio ? <p className="truncate grey-text">{user.profile.bio}</p> : undefined}
        </div>
      </div>
    </div>
  );
};

ProfileCell.propTypes = {
  // user: PropTypes.object.isRequired
};

export default createContainer(({ username }) => {
  const userSubscription = Meteor.subscribe('users.profileInfo', username);
  return {
    loading: !userSubscription.ready(),
    user: Meteor.users.findOne({username})
  };
}, ProfileCell);
