import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import $ from 'jquery';
import moment from 'moment';
import Modal from 'react-modal';
import Games from '../../../api/Games/Games';
import Comments from '../../../api/Comments/Comments';
import PaymentTest from '../../components/PaymentTest/PaymentTest';
import DeveloperWidget from '../../components/DeveloperWidget/DeveloperWidget';
import CommentBox from '../../components/CommentBox/CommentBox';
import CommentsList from '../../components/CommentsList/CommentsList';
import Loading from '../../components/Loading/Loading';
import GameNotFound from '../../components/GameNotFound/GameNotFound';

const customStyles = {
  overlay: {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.4)',
    zIndex            : 999
  },
  content : {
    // top                   : '50%',
    // left                  : '50%',
    // right                 : 'auto',
    // bottom                : 'auto',
    // marginRight           : '-50%',
    // transform             : 'translate(-50%, -50%)'
    height: '400px',
    width: '80%',
    margin: 'auto'
  }
};

export class GameView extends Component {
  componentDidMount() {
    $(document).ready(function() {
      // $('.modal').modal();
      // $('#modal').modal('open');
      // $('.modal-trigger').modal();
      $('.parallax').parallax();
      Materialize.updateTextFields();
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      // modalIsOpen: false,
      // chosenPrice: props.game ? props.game.minPrice : '0'
    };
  }
  renderDownloadLinks(uploads) {
    console.log(uploads);
    return uploads.map((upload) => (
      <div key={upload._id}>
        <p>{upload.name}</p>
      </div>
    ));
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
    const videoId = game && game.gameplayVideo ? this.getId(game.gameplayVideo) : undefined;
    const embedUrl =  game && game.gameplayVideo ? `https://youtube.com/embed/${videoId}` : undefined;
    return game.visibility || game.owner === Meteor.userId() ? (
      <div className="game-view">
        {/* <div id="modal" className="modal modal-fixed-footer">
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
              <label htmlFor="price-input">Name Your Price</label>
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
        </div> */}
        {/* <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Download Modal">
          <h5 className="modal-header">Buy '{game.title}'</h5>
          <div>
            <p>Download {game.title} by purchasing it for ${game.minPrice}.00 or more
              <br/ >
              <small>
                Support the developer by paying above the minimum price.
                <Link to="/docs" className="learn-more blue-text text-darken-2">Learn More</Link>
              </small>
            </p>
            <div className="modal-input input-field">
              <p className="price-label grey-text text-darken-2"><small>Name Your Price</small></p>
              <input
                type="number"
                id="priceInput"
                ref="priceInput"
                onChange={() => this.setState({chosenPrice: this.refs.priceInput.value})}
                defaultValue={game.minPrice} />
            </div>
          </div>
          <div className="modal-footer">
            <a className="btn waves-effect waves-light left">
              Pay with Card
              <i className="material-icons right">credit_card</i>
            </a>
            <PaymentTest title={game.title} price={this.state.chosenPrice} minPrice={game.minPrice} description={game.description} image={game.thumbnailImage} uploads={game.uploads}/>
            <a onClick={() => this.setState({modalIsOpen: false})} className="btn-flat waves-effect waves-light right">Cancel</a>
          </div>
        </Modal> */}
        {game && game.bannerImage ? (<div className="parallax-container">
          <div className="parallax">
            <img src={game.bannerImage} />
          </div>
        </div>) : undefined}
        <div className="container row">
          <div className="game-info col s12 card-panel">
            <div className="col s12 l8">
              <div className="left-section left">
                <h3>{game.title}</h3>
                <div className="download-widget">
                  {/* <a href="#modal" className="modal-trigger btn waves-effect waves-light left">
                    Download
                    <i className="material-icons right">file_download</i>
                  </a> */}
                  {/* <a onClick={() => this.setState({modalIsOpen: true})} className="btn waves-effect waves-light left">
                    Download
                    <i className="material-icons right">file_download</i>
                  </a> */}
                  {/* <p>${game.minPrice}.00 OR MORE</p> */}
                  {/* {this.renderDownloadLinks(game.uploads)} */}
                  {/* {game.uploads.length} */}
                  <a href={game.upload} className="btn waves-effect waves-light left" download>
                    Download
                    <i className="material-icons right">file_download</i>
                  </a>
                  {game.uploads.name}
                </div>
                {game && game.gameplayVideo ? (<div className="video-container">
                  <iframe src={embedUrl} width="853" height="480" frameBorder="0" allowFullScreen />
                </div>) : undefined}
                <div className="game-body left">
                  <p>{game.body}</p>
                </div>
              </div>
            </div>
            <div className="col s12 l4">
              <div className="right-section right">
                <DeveloperWidget username={game.owner} />
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
                  <p>Released: <b>{moment(game.createdAt).fromNow()}</b></p>
                  <p>Last updated: <b>{moment(game.updatedAt).fromNow()}</b></p>
                </div>
                {/* <Link
                  to={editGameRoute(game._id)}
                  className="btn waves-effect waves-light">
                  Edit
                </Link> */}
              </div>
            </div>
          </div>
          <h5>Comments</h5>
          <div className="divider"></div>
          {game.commentsEnabled ? <CommentBox gameId={this.props.match.params._id} /> : undefined}
          {game.commentsEnabled ? <CommentsList comments={this.props.comments} /> : undefined}
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
    comments: Comments.find({ gameId }).fetch()
  };
}, GameView);
