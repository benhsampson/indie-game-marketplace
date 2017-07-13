import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const handleGameNav = _id => `/game/${_id}`;

const GameCell = ({ game }) => (
  <div className="col s12 m6 l3">
    <div className="game-cell card z-depth-2 hoverable">
      <div className="card-image">
        <Link to={handleGameNav(game._id)}>
          <span className="price teal white-text">{game.minPrice}</span>
          <img src={game.thumbnail} />
        </Link>
      </div>
      <div className="card-content">
        <Link to={handleGameNav(game._id)}>
          <span className="card-title truncate grey-text text-darken-4">{game.title}</span>
        </Link>
        <p className="truncate grey-text text-darken-1">{game.description}</p>
      </div>
    </div>
  </div>
);

GameCell.propTypes = {
  game: PropTypes.object.isRequired
};

export default GameCell;
