import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Games from '../../../api/Games/Games';
import GamesList from '../GamesList/GamesList';
import Loading from '../../components/Loading/Loading';

export class FilteredGamesList extends Component {
  render() {
    return (
      <div>
        {this.props.loading ? <Loading /> : <GamesList games={this.props.games} />}
      </div>
    );
  }
}

FilteredGamesList.propTypes = {
  genre: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  games: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default createContainer(({ genre, platform }) => {
  const subscription = Meteor.subscribe('games');
  return {
    loading: !subscription.ready(),
    games: Games.find({ genres: genre, platforms: platform }).fetch()
  };
}, FilteredGamesList);
