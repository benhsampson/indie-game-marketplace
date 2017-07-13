import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GameCell from '../GameCell/GameCell';

const GamesList = ({ games }) => (
  <div className="games-list row">
    {games.map((game) => (
      <GameCell key={game._id} game={game} />
    ))}
  </div>
);

GamesList.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default GamesList;
