import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileGameCell from '../ProfileGameCell/ProfileGameCell';

const ProfileGamesList = ({ games }) => (
  <div className="row">
    {games.map((game) => (
      <ProfileGameCell key={game._id} game={game} />
    ))}
  </div>
);

ProfileGamesList.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ProfileGamesList;
