import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameEditor from '../../components/GameEditor/GameEditor';

export default class GameUpload extends Component {
  render() {
    return (
      <div>
        <GameEditor history={this.props.history} />
      </div>
    );
  }
}

GameUpload.propTypes = {
  history: PropTypes.object.isRequired
};
