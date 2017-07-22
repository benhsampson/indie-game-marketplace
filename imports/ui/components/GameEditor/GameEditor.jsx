import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropZone from 'react-dropzone';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import $ from 'jquery';
import 'jquery-validation';
import shortid from 'shortid';

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
      this.props.game.visibility ? $('#publicCheckbox').prop('checked', true) : $('#publicCheckbox').prop('checked', false);
    } else {
      $('#commentsEnabled').prop('checked', true);
      $('#publicCheckbox').prop('checked', false);
    }

    $('#form').on('keyup keypress', function(e) {
      var keyCode = e.keyCode || e.which;
      if (keyCode === 13) {
        e.preventDefault();
        console.log('clicked enter');
        return false;
      }
    });

    // $('textarea').on('keyup keypress', function(e) {
    //   var keyCode = e.keyCode || e.which;
    //   if (keyCode === 13) {
    //     e.preventDefault();
    //     // var s = $(this).val();
    //     // return $(this).val(s+'\n');
    //   }
    // });​

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

            let upload = {
              _id: shortid.generate(),
              number: this.state.uploads.length,
              name: this.refs.gameFileUpload.files[0].name,
              filePath: gameFile,
              // platforms: {}
            };

            newArray.push(upload);

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
  onUploadChangePlatform(uploadId, uploadNumber) {
    let platforms = [];

    $(`#${uploadId}`).find('.platform').each(function() {
      if ($(this).is(':checked')) {
        platforms.push($(this).val());
      } else if ($.inArray($(this).val(), platforms)) {
        platforms.splice(platforms.indexOf($(this).val()), 1);
      }
    });

    this.state.uploads[uploadNumber].platforms = platforms;
  }
  removeGameFile(uploadId) {
    let newArray = this.state.uploads.slice();
    let removedFile = this.state.uploads.indexOf(uploadId);

    newArray.splice(removedFile, 1);

    this.setState({uploads: newArray});
  }
  getUploadPlatformId(_id, platform) {
    return `${platform}${_id}`;
  }
  renderGameUploads() {
    return this.state.uploads.map((upload) => (
      <div className="col s12" id={upload._id} key={upload._id}>
        <div className="upload-card card">
          <div className="card-content">
            <span className="card-title grey-text text-darken-3">
              {upload.name}
              <a onClick={this.removeGameFile.bind(this, upload._id)} className="card-close right grey-text text-darken-2">
                <i className="material-icons right">delete</i>
              </a>
            </span>
          </div>
          <div className="card-action">
            <p>
              <input
                type="checkbox"
                id={this.getUploadPlatformId(upload._id, 'windows')}
                value="windows"
                className="platform"
                onChange={this.onUploadChangePlatform.bind(this, upload._id, upload.number)}
              />
              <label htmlFor={this.getUploadPlatformId(upload._id, 'windows')}>Windows</label>
            </p>
            <p>
              <input
                type="checkbox"
                id={this.getUploadPlatformId(upload._id, 'macOS')}
                value="macOS"
                className="platform"
                onChange={this.onUploadChangePlatform.bind(this, upload._id, upload.number)}
              />
              <label htmlFor={this.getUploadPlatformId(upload._id, 'macOS')}>Mac OS</label>
            </p>
            <p>
              <input
                type="checkbox"
                id={this.getUploadPlatformId(upload._id, 'linux')}
                value="linux"
                className="platform"
                onChange={this.onUploadChangePlatform.bind(this, upload._id, upload.number)}
              />
              <label htmlFor={this.getUploadPlatformId(upload._id, 'linux')}>Linux</label>
            </p>
          </div>
        </div>
      </div>
    ));
  }
  addTag() {
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
  addBanner(files) {
    console.log('adding bannner');

    const metaContext = { title: 'test' };

    const gameBanner = files[0];
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
  addThumbnail(files) {
    const metaContext = { title: 'test' };

    const gameThumbnail = files[0];
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
  addScreenshot(files) {
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
      <div key={screenshot} className="screenshot">
        <img src={screenshot} className="responsive-img" />
        <a onClick={this.removeScreenshot.bind(this)} className="btn waves-effect waves-light">
          Remove
          <i className="material-icons left">delete</i>
        </a>
      </div>
    ));
  }
  handleSubmit() {
    const existingGame = this.props.game && this.props.game._id;
    const methodToCall = existingGame ? 'games.update' : 'games.insert';

    const platforms = ['any'];

    $('.platform').each(function() {
      if ($(this).is(':checked')) {
        if ($.inArray($(this).val(), platforms) > -1) {
          console.log('Platform already listed');
        } else {
          platforms.push($(this).val());
        }
      }
    });

    console.log(this.state.uploads[0]);

    const game = {
      title: this.refs.title.value.trim(),
      description: this.refs.description.value.trim(),
      uploadsFileType: this.refs.uploadsFileType.value,
      releaseStatus: this.refs.releaseStatus.value,
      upload: this.state.uploads[0].filePath,
      // minPrice: Number(this.refs.price.value),
      uploads: this.state.uploads,
      // upload,
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
      visibility: $('#publicCheckbox').is(':checked')
    };

    if (existingGame) {
      game._id = existingGame;
    }

    Meteor.call(methodToCall, game, (err, gameId) => {
      if (err) {
        Materialize.toast(err.reason, 4000);
      } else {
        const confirmation = existingGame ? 'Game updated!' : 'Game added!';
        Materialize.toast('Success! ' + confirmation, 4000);
        this.props.history.push(`/games/${gameId}`)
      }
    })
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="editor-form form-panel card-panel col s12">
            <form id="form" ref="form" onSubmit={e => e.preventDefault()}>
              <div>
                <div className="col s12">
                  <h4 className="center-align">
                    {this.props.game && this.props.game._id ? `Editing '${this.props.game.title}'` : 'Upload a New Game'}
                  </h4>
                </div>
                <div className="form-section col s12 l8">
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        type="text"
                        spellCheck="false"
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
                  {/* <div className="row">
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
                  </div> */}
                  <div className="row">
                    <div className="input-field col s12">
                      <select id="uploadsFileType" ref="uploadsFileType" defaultValue={this.props.game && this.props.game.uploadsFileType} className="required">
                        <option value="downloadable">Downloadable</option>
                        <option value="html" disabled>HTML</option>
                        <option value="flash" disabled>Flash</option>
                        <option value="unity" disabled>Unity ≤ 5.3</option>
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
                            className="file-path"
                          />
                        </div>
                      </div>
                    </div>
                    {this.state.gameFileUploadProgress ? (
                    <div className="col s12">
                      <div className="progress">
                        <div className="determinate" style={{width: this.state.gameFileUploadProgress + '%'}}></div>
                      </div>
                    </div>
                    ) : undefined}
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
                    <div className="input-field col s12">
                      <select
                        id="genre"
                        ref="genre"
                        defaultValue={this.props.game && this.props.game.genre}
                        className="required">
                        <option value="action">Action</option>
                        <option value="platformer">Platformer</option>
                        <option value="shooter">Shooter</option>
                        <option value="adventure">Adventure</option>
                        <option value="rolePlaying">Role Playing</option>
                        <option value="simulation">Simulation</option>
                        <option value="strategy">Strategy</option>
                        <option value="puzzle">Puzzle</option>
                        <option value="sports">Sports</option>
                        <option value="other">Other</option>
                      </select>
                      <label htmlFor="genre">Genre</label>
                    </div>
                  </div>
                  <div className="row">
                    <div id="tags-form" ref="tags-form" className="tags-form">
                      <div className="tags-input input-field col s12">
                        <input
                          type="text"
                          spellCheck="false"
                          id="tags"
                          ref="tags"
                          placeholder="Small, bite-sized categories your game fits under"
                        />
                        <label htmlFor="tags">Tags</label>
                      </div>
                      <a onClick={this.addTag.bind(this)} className="btn waves-effect waves-light">Add Tag</a>
                    </div>
                    <div className="render-tags col s12">
                      {this.state.tags ? <div>{this.renderTags()}</div> : undefined}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <label>Banner Image</label>
                      <DropZone onDrop={this.addBanner.bind(this)} className="banner-drop-zone center-align grey-text text-darken-3">
                        {this.state.banner ? (
                          <div>
                            <img src={this.state.banner} className="responsive-img" />
                            <a className="btn waves-effect waves-light">
                              <i className="material-icons right">edit</i>
                              Replace
                            </a>
                          </div>
                        ) : (
                          <p>
                            <i className="material-icons left">cloud_upload</i>
                            Click or drag an image here
                            <br /><small>Preferably 851 x 351 pixels</small>
                          </p>
                        )}
                      </DropZone>
                    </div>
                    {this.state.bannerUploadProgress ? (
                    <div className="col s12">
                      <div className="progress">
                        <div className="determinate" style={{width: this.state.bannerUploadProgress + '%'}}></div>
                      </div>
                    </div>
                    ) : undefined}
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <input type="checkbox" id="commentsEnabled" ref="commentsEnabled" value="commentsEnabled" defaultChecked />
                      <label htmlFor="commentsEnabled">Comments Enabled</label>
                    </div>
                  </div>
                </div>
                <div className="form-section col s12 l4">
                  <div className="row">
                    <div className="col s12">
                      <label>Thumbnail Image</label>
                      <DropZone onDrop={this.addThumbnail.bind(this)} className="thumbnail-drop-zone center-align grey-text text-darken-3">
                        {this.state.thumbnail ? (
                          <div>
                            <img src={this.state.thumbnail} className="responsive-img" />
                            <a className="btn waves-effect waves-light">
                              Replace
                              <i className="material-icons left">edit</i>
                            </a>
                          </div>
                        ) : (
                          <p>
                            <i className="material-icons left">cloud_upload</i>
                            Click or drag an image here
                            <br /><small>Preferably 315 x 250 pixels</small>
                          </p>
                        )}
                      </DropZone>
                    </div>
                    {this.state.thumbnailUploadProgress ? (
                    <div className="col s12">
                      <div className="progress">
                        <div className="determinate" style={{width: this.state.thumbnailUploadProgress + '%'}}></div>
                      </div>
                    </div>
                    ) : undefined}
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        type="text"
                        spellCheck="false"
                        placeholder="eg: https://youtube.com/watch?v=dQw4w9WgXcQ"
                        id="gameplayVideo"
                        ref="gameplayVideo"
                        defaultValue={this.props.game && this.props.game.gameplayVideo}
                      />
                      <label htmlFor="gameplayVideo">Game Video or Trailer</label>
                    </div>
                  </div>
                  {this.state.screenshots.length > 0 ? (
                  <div className="row">
                    <div className="col s12">
                      {this.renderScreenshots()}
                    </div>
                  </div>
                  ) : undefined}
                  <div className="row">
                    <div className="col s12">
                      <label>Snapshots</label>
                      <div className="file-field input-field">
                        <div className="btn waves-effect waves-light">
                          <span>Add Screenshot <i className="material-icons right">add_to_photos</i></span>
                          <input
                            type="file"
                            id="screenshotsUpload"
                            ref="screenshotsUpload"
                            onChange={this.addScreenshot.bind(this)}
                            multiple
                          />
                        </div>
                      </div>
                    </div>
                    {this.state.screenshotUploadProgress ? (
                    <div className="col s12">
                      <div className="progress">
                        <div className="determinate" style={{width: this.state.screenshotUploadProgress + '%'}}></div>
                      </div>
                    </div>
                    ) : undefined }
                  </div>
                </div>
                <div className="col s12">
                  <div className="divider"></div>
                </div>
                <div className="form-footer col s12">
                  <div className="footer-content right">
                    <input type="radio" name="visibility" id="privateCheckbox" ref="privateCheckbox" value="private" defaultChecked/>
                    <label htmlFor="privateCheckbox">Private</label>
                    <input type="radio" name="visibility" id="publicCheckbox" ref="publicCheckbox" value="public" />
                    <label htmlFor="publicCheckbox">Public</label>
                    <button type="submit" name="action" className="btn waves-effect waves-light">Save & View Page</button>
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
