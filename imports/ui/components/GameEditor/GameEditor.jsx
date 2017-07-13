import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropZone from 'react-dropzone';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import $ from 'jquery';
import 'jquery-validation';

export default class GameEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploads: this.props.game.uploads || [],
      gameFileUploadProgress: '',
      banner: this.props.game && this.props.game.bannerImage,
      bannerUploadProgress: '',
      thumbnail: this.props.game && this.props.game.thumbnailImage,
      thumbnailUploadProgress: '',
      screenshots: this.props.game && this.props.game.screenshots || [],
      screenshotUploadProgress: '',
      tags: this.props.game && this.props.game.tags || []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const component = this;

    $(document).ready(function() {
      $('select').material_select();
      Materialize.updateTextFields();
    });

    if (this.props.game && this.props.game._id) {
      this.props.game.commentsEnabled ? $('#commentsEnabled').prop('checked', true) : $('#commentsEnabled').prop('checked', false);
      this.props.game.visibility ? $('#publicallyVisible').prop('checked', true) : $('#publicallyVisible').prop('checked', false);
    } else {
      $('#commentsEnabled').prop('checked', true);
      $('#publicallyVisible').prop('checked', false);
    }

    $('#form').on('keyup keypress', function(e) {
      var keyCode = e.keyCode || e.which;
      if (keyCode === 13) {
        e.preventDefault();
        return false;
      }
    });

    $(this.refs.form).validate({
      rules: {
        title: {
          required: true,
          maxlength: 64
        },
        description: {
          required: true,
          maxlength: 64
        },
        uploadsFileType: {
          required: true
        },
        releaseStatus: {
          required: true
        },
        price: {
          required: true
        },
        platforms: {
          required: true
        },
        genre: {
          required: true
        },
        body: {
          required: true,
          maxlength: 9999
        }
      },
      messages: {
        title: {
          required: 'Please enter a title for your game.',
          maxlength: 'Your title can\'t exceed 64 characters'
        },
        description: {
          required: 'Please enter a short description/tagline for your game.',
          maxlength: 'Your description can\'t exceed 64 characters'
        },
        releaseStatus: {
          required: 'Please choose the current release status of your game.'
        },
        price: {
          required: 'Please enter the minimum price of your game.'
        },
        gameFileUpload: {
          required: 'Please upload at least one game file.'
        },
        platforms: {
          required: 'Please choose the platform/s your game supports.'
        },
        body: {
          required: 'Please enter a body descriptor for your game.'
        },
        genre: {
          required: 'Please choose the genre of your game'
        }
      },
      submitHandler() {
        component.handleSubmit();
      }
    });
  }
  addGameFile() {
    if (this.state.uploads.length < 10) {
      if (this.state.uploads.indexOf(this.refs.gameFileUpload.files[0].name) > -1) {
        Materialize.toast('This game file has already been uploaded!', 4000);
      } else {
        const metaContext = { title: 'test' };

        const gameFile = document.getElementById('gameFileUpload').files[0];
        const uploader = new Slingshot.Upload('GameFile', metaContext);

        uploader.send(gameFile, (err, gameFile) => {
          if (err) {
            Materialize.toast(uploader.xhr.response, 4000);
          } else {
            Materialize.toast('Success! Game file uploaded to the cloud!', 4000, 'green');
            let newArray = this.state.uploads.slice();
            newArray.push(gameFile);

            this.setState({uploads: newArray});
            Materialize.toast('Success! Game files updated!', 4000, 'green');
          }
        });

        let computation = Tracker.autorun(() => {
          if (!isNaN(uploader.progress())) {
            this.setState({gameFileUploadProgress: uploader.progress() * 100});
          }
        });
      }
    } else {
      Materialize.toast('No more than 10 game files!', 4000);
    }
  }
  removeGameFile(gameFile) {
    let newArray = this.state.uploads.slice();
    let removedFile = this.state.uploads.indexOf(gameFile);

    newArray.splice(removedFile, 1);

    this.setState({uploads: newArray});
  }
  renderGameUploads() {
    return this.state.uploads.map((upload) => (
      <div className="col s12" key={upload}>
        <div className="card">
          <div className="card-content">
            <span className="card-title">{upload}</span>
            <div className="card-close">
              <a onClick={this.removeGameFile.bind(this, upload)}>
                <i className="material-icons right">delete</i>
              </a>
            </div>
          </div>
          <div className="card-action">
            <p>
              <input
                type="checkbox"
                id="windowsPlatformSupport"
                ref="windowsPlatformSupport"
                value="windows"
              />
              <label htmlFor="windowsPlatformSupport">Windows</label>
            </p>
            <p>
              <input
                type="checkbox"
                id="macOSPlatformSupport"
                ref="macOSPlatformSupport"
                value="macOS"
              />
              <label htmlFor="macOSPlatformSupport">Mac OS</label>
            </p>
            <p>
              <input
                type="checkbox"
                id="linuxPlatformSupport"
                ref="linuxPlatformSupport"
                value="linux"
              />
              <label htmlFor="linuxPlatformSupport">Linux</label>
            </p>
          </div>
        </div>
      </div>
    ));
  }
  addTag(e) {
    e.preventDefault();

    if (this.state.tags.length < 10) {
      if (this.state.tags.indexOf(this.refs.tags.value) > -1) {
        Materialize.toast('This tag already exists!', 4000);
      } else {
        if (this.refs.tags.value.length > 0) {
          let newArray = this.state.tags.slice();
          newArray.push(this.refs.tags.value);

          this.setState({tags: newArray});
          this.refs.tags.value = '';
        } else {
          Materialize.toast('Your tag is blank!', 4000);
        }
      }
    } else {
      Materialize.toast('No more than 10 tags!', 4000);
    }
  }
  removeTag(tag) {
    let newArray = this.state.tags.slice();
    let removedTag = this.state.tags.indexOf(tag);

    newArray.splice(removedTag, 1);

    this.setState({tags: newArray});
  }
  renderTags() {
    return this.state.tags.map((tag) => (
      <div key={tag} className="chip">
        {tag} <i onClick={this.removeTag.bind(this, tag)} className="close material-icons">close</i>
      </div>
    ));
  }
  addBanner() {
    const metaContext = { title: 'test' };

    const gameBanner = document.getElementById('bannerUpload').files[0];
    const uploader = new Slingshot.Upload('GameBanner', metaContext);

    uploader.send(gameBanner, (err, gameBanner) => {
      if (err) {
        Materialize.toast(uploader.xhr.response, 4000);
      } else {
        Materialize.toast('Success! Banner uploaded to the cloud!', 4000);
        this.setState({banner: gameBanner});
      }
    });

    let computation = Tracker.autorun(() => {
      if (!isNaN(uploader.progress())) {
        this.setState({bannerUploadProgress: uploader.progress() * 100});
      }
    });
  }
  addThumbnail() {
    const metaContext = { title: 'test' };

    const gameThumbnail = document.getElementById('thumbnailUpload').files[0];
    const uploader = new Slingshot.Upload('GameThumbnail', metaContext);

    uploader.send(gameThumbnail, (err, gameThumbnail) => {
      if (err) {
        Materialize.toast(uploader.xhr.response, 4000);
      } else {
        Materialize.toast('Success! Thumbnail uploaded to the cloud!', 4000);
        this.setState({thumbnail: gameThumbnail});
      }
    });

    let computation = Tracker.autorun(() => {
      if (!isNaN(uploader.progress())) {
        this.setState({thumbnailUploadProgress: uploader.progress() * 100});
      }
    });
  }
  addScreenshot() {
    if (this.state.screenshots.length < 10) {
      if (this.state.screenshots.indexOf(this.refs.screenshotsUpload.files[0].name) > -1) {
        Materialize.toast('This screenshot with this name has already been uploaded!', 4000);
      } else {
        const metaContext = { title: 'test' };

        const gameScreenshot = document.getElementById('screenshotsUpload').files[0];
        const uploader = new Slingshot.Upload('GameScreenshot', metaContext);

        uploader.send(gameScreenshot, (err, gameScreenshot) => {
          if (err) {
            Materialize.toast(uploader.xhr.response, 4000);
          } else {
            Materialize.toast('Success! Screenshot uploaded to the cloud!', 4000);
            let newArray = this.state.screenshots.slice();
            newArray.push(gameScreenshot);

            this.setState({screenshots: newArray});
            Materialize.toast('Success! Screnshot uploaded!', 4000);
          }
        });

        let computation = Tracker.autorun(() => {
          if (!isNaN(uploader.progress())) {
            this.setState({screenshotUploadProgress: uploader.progress() * 100});
          }
        });
      }
    } else {
      Materialize.toast('No more than 10 screenshots!', 4000);
    }
  }
  removeScreenshot(screenshot) {
    let newArray = this.state.screenshots.slice();
    let removedScreenshot = this.state.tags.indexOf(screenshot);

    newArray.splice(removedScreenshot, 1);

    this.setState({screenshots: newArray});
  }
  renderScreenshots() {
    return this.state.screenshots.map((screenshot) => (
      <li key={screenshot}><img src={screenshot} width="200" /> <a onClick={this.removeScreenshot.bind(this)}>x</a></li>
    ));
  }
  handleSubmit() {
    const existingGame = this.props.game && this.props.game._id;
    const methodToCall = existingGame ? 'games.update' : 'games.insert';

    const platforms = $('#platforms').val();
    platforms.push('any');

    const game = {
      title: this.refs.title.value.trim(),
      description: this.refs.description.value.trim(),
      uploadsFileType: this.refs.uploadsFileType.value,
      releaseStatus: this.refs.releaseStatus.value,
      minPrice: Number(this.refs.price.value),
      uploads: this.state.uploads,
      platforms,
      body: this.refs.body.value.trim(),
      genre: this.refs.genre.value,
      genres: [this.refs.genre.value, 'any'],
      tags: this.state.tags,
      bannerImage: this.state.banner,
      thumbnailImage: this.state.thumbnail,
      gameplayVideo: this.refs.gameplayVideo.value,
      screenshots: this.state.screenshots,
      commentsEnabled: $('#commentsEnabled').is(':checked'),
      visibility: $('#publicallyVisible').is(':checked')
    };

    if (existingGame) {
      game._id = existingGame;
    }

    Meteor.call(methodToCall, game, (err, gameId) => {
      if (err) {
        Materialize.toast(err.reason, 4000);
      } else {
        const confirmation = existingGame ? 'Game updated!' : 'Game added!';
        Materialize.toast('Success!' + confirmation, 4000);
        this.props.history.push(`/game/${gameId}`)
      }
    })
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="form-panel card-panel col s12">
            <form id="form" ref="form" onSubmit={e => e.preventDefault()}>
              <div className="row">
                <div className="col s12">
                  <h4 className="center-align">Upload a New Game</h4>
                </div>
                <div className="col s12 l8">
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        type="text"
                        id="title"
                        ref="title"
                        placeholder="What is your game called?"
                        defaultValue={this.props.game && this.props.game.title}
                      />
                      <label htmlFor="title">Title</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        type="text"
                        id="description"
                        ref="description"
                        placeholder="A short description or tagline for your game"
                        defaultValue={this.props.game && this.props.game.description}
                      />
                      <label htmlFor="description">Description</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <select
                        id="releaseStatus"
                        ref="releaseStatus"
                        defaultValue={this.props.game && this.props.game.releaseStatus}
                        className="required">
                        <option value="released">Released</option>
                        <option value="inDevelopment">In development</option>
                        <option value="onHold">On hold</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="prototype">Prototype</option>
                      </select>
                      <label htmlFor="releaseStatus">Release Status</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        type="number"
                        id="price"
                        ref="price"
                        placeholder="The minimum price consumers can pay for your game"
                        defaultValue={this.props.game && this.props.game.minPrice}
                      />
                      <label htmlFor="price">Pricing</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <select id="uploadsFileType" ref="uploadsFileType" defaultValue={this.props.game && this.props.game.uploadsFileType} className="required">
                        <option value="downloadable">Downloadable</option>
                        <option value="html">HTML</option>
                        <option value="flash">Flash</option>
                        <option value="unity">Unity ≤ 5.3</option>
                      </select>
                      <label htmlFor="uploadsFileType">File Types</label>
                    </div>
                  </div>
                  {this.state.uploads.length > 0 ? <div className="row">{this.renderGameUploads()}</div> : undefined}
                  <div className="row">
                    <div className="col s12">
                      <label htmlFor="gameFileUpload">Downloadable Game Files</label>
                      <div className="file-field input-field">
                        <div className="btn">
                          <span>File</span>
                          <input
                            type="file"
                            id="gameFileUpload"
                            ref="gameFileUpload"
                            onChange={this.addGameFile.bind(this)}
                            multiple
                          />
                        </div>
                        <div className="file-path-wrapper">
                          <input
                            type="text"
                            placeholder="Upload one or more downloadable game files"
                            className="file-path validate"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col s12">
                      <div className="progress">
                        <div className="determinate" style={{width: this.state.gameFileUploadProgress + '%'}}></div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <textarea
                        id="body"
                        ref="body"
                        placeholder="The bulk of your page's content"
                        defaultValue={this.props.game && this.props.game.body}
                        className="materialize-textarea"
                      />
                      <label htmlFor="body">Body</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <select id="genre" ref="genre" defaultValue={this.props.game && this.props.game.genres} multiple>
                        <option value="action">Action</option>
                        <option value="platformer">Platformer</option>
                        <option value="shooter">Shooter</option>
                        <option value="adventure">Adventure</option>
                        <option value="rolePlaying">Role Playing</option>
                        <option value="simulaion">Simulation</option>
                        <option value="strategy">Strategy</option>
                        <option value="puzzle">Puzzle</option>
                        <option value="sports">Sports</option>
                        <option value="other">Other</option>
                      </select>
                      <label htmlFor="genre">Genre</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 tags-input">
                      <input
                        type="text"
                        id="tags"
                        ref="tags"
                        placeholder="Small, bite-sized categories your game fits under"
                      />
                      <label htmlFor="tags">Tags</label>
                      <a onClick={this.addTag.bind(this)} className="btn waves-effect waves-light">Add Tag</a>
                    </div>
                    <div className="col s12">
                      {this.state.tags ? <div>{this.renderTags()}</div> : undefined}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      {/* <label>Banner Image</label>
                      <div className="banner-upload">
                        <p>
                          <i className="material-icons left">cloud_upload</i>
                          Click or drag an image here
                          <br />
                          <small>Preferably 851 x 351 pixels</small>
                        </p>
                      </div> */}
                      <DropZone onDrop={this.addBanner.bind(this)}>
                        <p>
                          <i className="material-icons left">cloud_upload</i>
                          Click or drag an image here
                          <br />
                          <small>Preferably 851 x 351 pixels</small>
                        </p>
                      </DropZone>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

GameEditor.defaultProps = {
  game: {
    title: '',
    body: ''
  }
};

GameEditor.propTypes = {
  game: PropTypes.object,
  history: PropTypes.object.isRequired
};
