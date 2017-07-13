import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Games from '../../../api/Games/Games';
import GamesList from '../../components/GamesList/GamesList';
import Loading from '../../components/Loading/Loading';

const BrowseGames = ({loading, games}) => (
  <div>
    {loading ? <Loading /> : <GamesList games={games} />}
  </div>
);

BrowseGames.propTypes = {
  loading: PropTypes.bool.isRequired,
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('games');
  return {
    loading: !subscription.ready(),
    games: Games.find().fetch()
  };
}, BrowseGames);
