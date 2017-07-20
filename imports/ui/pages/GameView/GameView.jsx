import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Games from '../../../api/Games/Games';
import Comments from '../../../api/Comments/Comments';
import PaymentTest from '../../components/PaymentTest/PaymentTest';
import CommentsList from '../../components/CommentsList/CommentsList';
import Loading from '../../components/Loading/Loading';
import GameNotFound from '../../components/GameNotFound/GameNotFound';

export class GameView extends Component {
  componentDidMount() {
    $(document).ready(function() {
      $('.modal').modal();
      $('#modal-download').modal('open');
      $('.parallax').parallax();
    });
  }
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
      <div key={screenshot}>
        <img src={screenshot} className="responsive-img" />
      </div>
    ));
  }
  renderPlatforms(platforms) {
    return platforms.map((platform) => (
      <b key={platform}>{platform}, </b>
    ));
  }
  renderTags(tags) {
    return tags.map((tag) => (
      <b key={tag}>{tag}, </b>
    ));
  }
  renderGame(game) {
    const editGameRoute = _id => `/edit/game/${_id}`;
    const profileRoute = username => `/profile/${username}`;
    const videoId = this.getId(game.gameplayVideo);
    const embedUrl = `https://youtube.com/embed/${videoId}`;
    return game.visibility || game.owner === Meteor.userId() ? (
      <div className="game-view">
        <div id="modal-download" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h5>Buy '{game.title}'</h5>
            <p>Download {game.title} by purchasing it for ${game.price}.00 or more
              <br />
              <small>
                Support the developer by paying above the minimum price.
                <Link to="/docs" className="learn-more">Learn More</Link>
              </small>
            </p>
            <div className="input-field col s12 l6">
              <input
                type="number"
                id="price-input"
                ref="price-input"
                defaultValue={game.minPrice}
              />
              <label htmlFor="price-input">Name Your price</label>
            </div>
          </div>
          <div className="modal-footer">
            <a className="modal-action btn waves-effect waves-light blue left">
              Pay with Paypal
            </a>
            <a className="modal-action btn waves-effect waves-light left">
              Pay with Card
              <i className="material-icons right">credit_card</i>
            </a>
            <a className="modal-action btn-flat modal-close waves-effect waves-light right">Cancel</a>
          </div>
        </div>
        <div className="parallax-container">
          <div className="parallax">
            <img src={game.bannerImage} />
          </div>
        </div>
        <div className="container row">
          <div className="game-info col s12 card-panel">
            <div className="col s12 l8">
              <div className="left-section left">
                <h3>{game.title}</h3>
                <div className="download-widget">
                  <a href="#modal-download" className="modal-trigger btn waves-effect waves-light left">
                    Download
                    <i className="material-icons right">file_download</i>
                  </a>
                  <p className="left">${game.minPrice}.00 OR MORE</p>
                </div>
                <div className="video-container">
                  <iframe src={embedUrl} width="853" height="480" frameBorder="0" allowFullScreen />
                </div>
                <div className="game-body left">
                  <p>{game.body}</p>
                </div>
              </div>
            </div>
            <div className="col s12 l4">
              <div className="right-section right">
                <div className="developer-widget">
                  <Link to={profileRoute(game.owner)}>
                    <img
                      src={Meteor.users.findOne({ username: game.owner }).profile.profilePicture}
                      className="circle responsive-img left"
                      height="60"
                      width="60"
                    />
                  </Link>
                  <p className="left">
                    <Link to={profileRoute(game.owner)}>
                      <b className="left">ben</b>
                    </Link>
                    <a className="btn btn-small waves-effect waves-light">
                      Follow
                      <i className="material-icons left">person_add</i>
                    </a>
                  </p>
                </div>
                <div className="snapshots-container">
                  {game.screenshots.length > 0 ? this.renderScreenshots(game.screenshots) : undefined}
                </div>
                <div className="additional-info-widget">
                  <p>Plaforms: {this.renderPlatforms(game.platforms)}</p>
                  <p>Release Status: <b>{game.releaseStatus}</b></p>
                  <p>Genre: <b>{game.genre}</b></p>
                  {/* <p>Published: <b>{game.releaseDate}</b></p> */}
                  {/* <p>Rating: <b>{game.rating}</b></p> */}
                  <p>Tags: {this.renderTags(game.tags)}</p>
                </div>
                {/* <Link
                  to={editGameRoute(game._id)}
                  className="btn waves-effect waves-light">
                  Edit
                </Link> */}
              </div>
            </div>
          </div>
          <div className="container row">
            <div className="col s12 l8">
              {this.props.commentsLoading ? <p>Comments: {this.props.comments.length}</p> : <p>Loading</p> }
              {game.commentsEnabled ? <CommentsList comments={this.props.comments}/> : undefined}
            </div>
          </div>
        </div>
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
  // game: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default createContainer(({ match }) => {
  const gameId = match.params._id;
  const subscription = Meteor.subscribe('games.view', gameId);
  const commentsSubscription = Meteor.subscribe('comments', gameId);

  return {
    loading: !subscription.ready(),
    commentsLoading: !commentsSubscription.ready(),
    game: Games.findOne(gameId),
    comments: Comments.find()
  };
}, GameView);
