import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Loading from '../Loading/Loading';

const profileNav = username => `/profile/${username}`;

const Comment = ({ loading, user, comment }) => (
  <div>
    { loading ? <Loading /> : (<div className="comment card-panel col s12 l8">
      <Link to={profileNav(user.username)} className="img-container left">
        <img src={user.profile.profilePicture} width="50" height="50" className="responsive-img circle" />
      </Link>
      <p>
        <Link to={profileNav(user.username)}>
          {user.username}
        </Link>
        {comment.createdAt}
      </p>
      {comment.comment}
    </div>)}
  </div>
);

Comment.propTypes = {
  loading: PropTypes.bool.isRequired,
  // user: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired
};

export default createContainer(({ comment }) => {
  const subscription = Meteor.subscribe('users.profileInfo', comment.owner);
  return {
    loading: !subscription.ready(),
    user: Meteor.users.findOne({username: comment.owner}),
    comment
  }
}, Comment);
