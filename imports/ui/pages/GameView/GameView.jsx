import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Games from '../../../api/Games/Games';
import PaymentTest from '../../components/PaymentTest/PaymentTest';
import Loading from '../../components/Loading/Loading';
import GameNotFound from '../../components/GameNotFound/GameNotFound';

export class GameView extends Component {
  getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return 'error';
    }
  }
  renderScreenshots(screenshots) {
    return screenshots.map((screenshot) => (
      <li key={screenshot}><img src={screenshot} width="200" /></li>
    ));
  }
  renderPlatforms(platforms) {
    return platforms.map((platform) => (
      <li key={platform}>{platform}</li>
    ));
  }
  renderTags(tags) {
    return tags.map((tag) => (
      <li key={tag}>{tag}</li>
    ));
  }
  renderGame(game) {
    const profileRoute = username => `/profile/${username}`;
    // const videoId = this.getId(game.gameplayVideo);
    // const embedUrl = `https://youtube.com/embed/${videoId}`;
    return game.visibility || game.owner === Meteor.userId() ? (
      <div>
        {/* <img src={game.bannerImage} width="851" height="315" /> */}
        <h3>{game.title}</h3>
        {/* <PaymentTest
          price={game.minPrice}
          image={game.thumbnailImage}
          title={game.title}
          description={game.description}
        />
        <br />
        <br />
        <iframe src={embedUrl} frameBorder="0" allowFullScreen />
        <p>{game.body}</p>
        <Link to={profileRoute(game.owner)}>{game.owner}</Link>
        <ul>
          {this.renderScreenshots(game.screenshots)}
        </ul>
        <ul>
          {this.renderPlatforms(game.platforms)}
        </ul>
        <ul>
          {this.renderTags(game.tags)}
        </ul>
        <ul>
          <li>{game.releaseStatus}</li>
        </ul>
        {game.owner === Meteor.userId() ?
          <button onClick={() => this.props.history.push(`/games/${this.props.match.params._id}/edit`)}>
            Edit
          </button> : undefined
        } */}
        {game.commentsEnabled ? <p>comments</p> : undefined}
      </div>
    ) : <GameNotFound />;
  }
  render() {
    return (
      <div>
        {this.props.loading ? <Loading /> : this.renderGame(this.props.game)}
      </div>
    );
  }
}

GameView.propTypes = {
  loading: PropTypes.bool.isRequired,
  game: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default createContainer(({match}) => {
  const gameId = match.params._id;
  const subscription = Meteor.subscribe('games.view', gameId);

  return {
    loading: !subscription.ready(),
    game: Games.findOne(gameId)
  };
}, GameView);
