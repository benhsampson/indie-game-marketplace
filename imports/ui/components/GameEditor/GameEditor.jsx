import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        console.log('This game file has already been uploaded!');
      } else {
        const metaContext = { title: 'test' };

        const gameFile = document.getElementById('gameFileUpload').files[0];
        const uploader = new Slingshot.Upload('GameFile', metaContext);

        uploader.send(gameFile, (err, gameFile) => {
          if (err) {
            console.log(uploader.xhr.response);
          } else {
            console.log('Success!', 'Game file uploaded to the cloud!');
            let newArray = this.state.uploads.slice();
            newArray.push(gameFile);

            this.setState({uploads: newArray});
            console.log('Success!', 'Game files updated!');
          }
        });

        let computation = Tracker.autorun(() => {
          if (!isNaN(uploader.progress())) {
            this.setState({gameFileUploadProgress: uploader.progress() * 100});
          }
        });
      }
    } else {
      console.log('No more than 10 game files!');
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
      <li key={upload}>{upload} <a onClick={this.removeGameFile.bind(this, upload)}>x</a></li>
    ));
  }
  addTag(e) {
    e.preventDefault();

    if (this.state.tags.length < 10) {
      if (this.state.tags.indexOf(this.refs.tags.value) > -1) {
        console.log('This tag already exists!');
      } else {
        if (this.refs.tags.value.length > 0) {
          let newArray = this.state.tags.slice();
          newArray.push(this.refs.tags.value);

          this.setState({tags: newArray});
          this.refs.tags.value = '';
        } else {
          console.log('Your tag is blank!');
        }
      }
    } else {
      console.log('No more than 10 tags!');
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
      <li key={tag}>{tag} <a onClick={this.removeTag.bind(this, tag)}>x</a></li>
    ));
  }
  addBanner() {
    const metaContext = { title: 'test' };

    const gameBanner = document.getElementById('bannerUpload').files[0];
    const uploader = new Slingshot.Upload('GameBanner', metaContext);

    uploader.send(gameBanner, (err, gameBanner) => {
      if (err) {
        console.log(uploader.xhr.response);
      } else {
        console.log('Success!', 'Banner uploaded to the cloud!');
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
        console.log(uploader.xhr.response);
      } else {
        console.log('Success!', 'Thumbnail uploaded to the cloud!');
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
        console.log('This screenshot with this name has already been uploaded!');
      } else {
        const metaContext = { title: 'test' };

        const gameScreenshot = document.getElementById('screenshotsUpload').files[0];
        const uploader = new Slingshot.Upload('GameScreenshot', metaContext);

        uploader.send(gameScreenshot, (err, gameScreenshot) => {
          if (err) {
            console.log(uploader.xhr.response);
          } else {
            console.log('Success!', 'Screenshot uploaded to the cloud!');
            let newArray = this.state.screenshots.slice();
            newArray.push(gameScreenshot);

            this.setState({screenshots: newArray});
            console.log('Success!', 'Screnshot uploaded!');
          }
        });

        let computation = Tracker.autorun(() => {
          if (!isNaN(uploader.progress())) {
            this.setState({screenshotUploadProgress: uploader.progress() * 100});
          }
        });
      }
    } else {
      console.log('No more than 10 screenshots!');
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
        console.log(err.reason);
      } else {
        const confirmation = existingGame ? 'Game updated!' : 'Game added!';
        console.log('Success!', confirmation);
        this.props.history.push(`/game/${gameId}`)
      }
    })
  }
  render() {
    return (
      <div>
        <form id="form" ref="form" onSubmit={e => e.preventDefault()}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            ref="title"
            defaultValue={this.props.game && this.props.game.title}
          />
          <br />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            ref="description"
            defaultValue={this.props.game && this.props.game.description}
          />
          <br />
          <label htmlFor="uploadsFileType">File Types</label>
          <select name="uploadsFileType" id="uploadsFileType" ref="uploadsFileType" defaultValue={this.props.game && this.props.game.uploadsFileType} className="required">
            <option value="downloadable">Downloadable</option>
            <option value="html">HTML</option>
            <option value="flash">Flash</option>
            <option value="unity">Unity ≤ 5.3</option>
          </select>
          <br />
          <label htmlFor="releaseStatus">Release Status</label>
          <select name="releaseStatus" id="releaseStatus" ref="releaseStatus" defaultValue={this.props.game && this.props.game.releaseStatus} className="required">
            <option value="released">Released</option>
            <option value="inDevelopment">In Development</option>
            <option value="onHold">On Hold</option>
            <option value="cancelled">Cancelled</option>
            <option value="prototype">Prototype</option>
          </select>
          <br />
          <label htmlFor="price">Pricing</label>
          <input
            type="number"
            name="price"
            id="price"
            ref="price"
            defaultValue={this.props.game && this.props.game.minPrice}
          />
          <br />
          <ul>
            {this.renderGameUploads()}
          </ul>
          <label htmlFor="gameFileUpload">Upload Game Files</label>
          <input
            type="file"
            name="gameFileUpload"
            id="gameFileUpload"
            ref="gameFileUpload"
            onChange={this.addGameFile.bind(this)}
            multiple
          />
          {this.state.gameFileUploadProgress}
          <br />
          <br />
          <label htmlFor="gameFileUpload">Platforms</label>
          <br />
          <select name="platforms" id="platforms" ref="platforms" defaultValue={this.props.game && this.props.game.platforms} multiple>
            <option value="windows">Windows</option>
            <option value="macOS">macOS</option>
            <option value="linux">Linux</option>
            <option value="web">Web</option>
          </select>
          <br />
          <label htmlFor="body">Body</label>
          <br />
          <textarea
            type="text"
            name="body"
            id="body"
            ref="body"
            defaultValue={this.props.game && this.props.game.body}
          />
          <br />
          <label htmlFor="genre">Genre</label>
          <br />
          <select name="genre" id="genre" ref="genre" defaultValue={this.props.game && this.props.game.genres} multiple>
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
          <br />
          <br />
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            name="tags"
            id="tags"
            ref="tags"
          />
          <button onClick={this.addTag.bind(this)}>Add tag</button>
          {this.state.tags ? <ul>{this.renderTags()}</ul> : undefined}
          <br />
          <img src={this.state.banner} width="851" height="315" />
          <br />
          <label htmlFor="bannerUpload">Upload Banner</label>
          <input
            type="file"
            name="bannerUpload"
            id="bannerUpload"
            ref="bannerUpload"
            onChange={this.addBanner.bind(this)}
          />
          {this.state.bannerUploadProgress}
          <br />
          <br />
          <img src={this.state.thumbnail} width="315" height="250" />
          <br />
          <label htmlFor="thumbnailUpload">Upload Thumbnail</label>
          <input
            type="file"
            name="thumbnailUpload"
            id="thumbnailUpload"
            ref="thumbnailUpload"
            onChange={this.addThumbnail.bind(this)}
          />
          {this.state.thumbnailUploadProgress}
          <br />
          <br />
          <label htmlFor="gameplayVideo">Game Video or Trailer</label>
          <input
            type="text"
            name="gameplayVideo"
            id="gameplayVideo"
            ref="gameplayVideo"
            defaultValue={this.props.game && this.props.game.gameplayVideo}
          />
          <br />
          <br />
          <ul>
            {this.renderScreenshots()}
          </ul>
          <label htmlFor="screenshotsUpload">Upload Screenshots</label>
          <input
            type="file"
            name="screenshotsUpload"
            id="screenshotsUpload"
            ref="screenshotsUpload"
            onChange={this.addScreenshot.bind(this)}
            multiple
          />
          {this.state.screenshotUploadProgress}
          <br />
          <br />
          <input
            type="checkbox"
            name="commentsEnabled"
            ref="commentsEnabled"
            id="commentsEnabled"
            value="commentsEnabled"
          /> Comments Enabled
          <br />
          <input
            type="checkbox"
            name="publicallyVisible"
            ref="publicallyVisible"
            id="publicallyVisible"
            value="public"
          /> Publically Visible
          <br />
          <button type="submit">
            { this.props.game && this.props.game._id ? 'Save Changes' : 'Add Game'}
          </button>
        </form>
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
