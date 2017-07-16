import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileCell from '../ProfileCell/ProfileCell';

const ProfilesList = ({ users }) => (
  <div className="profiles-list row">
    {users.map((username) => (
      <ProfileCell key={username} username={username} />
    ))}
  </div>
);

ProfilesList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ProfilesList;
