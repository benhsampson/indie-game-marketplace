import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Games from '../../../api/Games/Games';
import GameEditor from '../../components/GameEditor/GameEditor';
import Loading from '../../components/Loading/Loading';
import GameNotFound from '../../components/GameNotFound/GameNotFound';

export class GameEdit extends Component {
  render() {
    return this.props.loading ? <Loading /> : (
      <div>
        <GameEditor game={this.props.game} history={this.props.history} />
      </div>
    );
  }
}

GameEdit.propTypes = {
  game: PropTypes.object,
  history: PropTypes.object.isRequired
};

export default createContainer(({ match }) => {
  const gameId = match.params._id;
  const subscription = Meteor.subscribe('games.updateView', gameId);
  console.log(Games.findOne(gameId));
  return {
    loading: !subscription.ready(),
    game: Games.findOne(gameId)
  };
}, GameEdit);
