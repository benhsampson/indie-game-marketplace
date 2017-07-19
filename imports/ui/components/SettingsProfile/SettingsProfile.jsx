import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Accounts } from 'meteor/accounts-base';
import DropZone from 'react-dropzone';
import $ from 'jquery';
import 'jquery-validation';

export default class SettingsProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: props.user.profile.profilePicture,
      profilePictureUploadProgress: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    Slingshot.fileRestrictions('ProfilePicture', {
      allowedFileTypes: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
      maxSize: 2 * 1024 * 1024
    });
  }
  componentDidMount() {
    const component = this;

    $(document).ready(function() {
      $('ul.tabs').tabs();
      Materialize.updateTextFields();
    });

    $(this.refs.form).validate({
      rules: {
        username: {
          required: true
        },
        email: {
          required: true,
          email: true
        },
        bio: {
          maxlength: 999
        }
      },
      messages: {
        username: {
          required: `Please enter your username.`
        },
        email: {
          required: `Please enter a email address.`,
          email: 'Please enter a valid email address.'
        }
      },
      submitHandler() {
        component.handleSubmit();
      }
    });
  }
  uploadProfilePicture(files) {
    const metaContext = { title: 'test' };

    const profilePicture = files[0];
    const uploader = new Slingshot.Upload('ProfilePicture', metaContext);

    uploader.send(profilePicture, (err, profilePicture) => {
      if (err) {
        console.log(uploader.xhr.response);
      } else {
        console.log('Success!', 'Profile picture uploaded to cloud!');
        this.setState({profilePicture});
      }
    });

    let computation = Tracker.autorun(() => {
      if (!isNaN(uploader.progress())) {
        this.setState({profilePictureUploadProgress: uploader.progress() * 100});
      }
    });
  }
  handleSubmit() {
    const profile = {
      username: this.refs.username.value,
      email: this.refs.email.value,
      profile: {
        profilePicture: this.state.profilePicture,
        twitter: this.refs.twitter.value,
        bio: this.refs.bio.value
      }
    };

    Meteor.call('users.editPublicSettings', this.props.user._id, profile, (err) => {
      if (err) {
        console.log(err.reason);
      } else {
        console.log('Success!', 'Profile updated!');
        const profileUrl = `/profile/${this.props.user.username}`;
        this.props.history.push(profileUrl);
      }
    });
  }
  render() {
    return (
      <div>
        <h5>Profile</h5>
        <form ref="form" onSubmit={e => e.preventDefault()}>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                id="username"
                ref="username"
                defaultValue={this.props.user.username}
              />
              <label htmlFor="username">Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="email"
                id="email"
                ref="email"
                defaultValue={this.props.user.emails[0].address}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                placeholder="eg @username"
                id="twitter"
                ref="twitter"
                defaultValue={this.props.user.profile.twitter}
              />
              <label htmlFor="twitter">Twitter</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea
                id="bio"
                ref="bio"
                className="materialize-textarea"
                defaultValue={this.props.user.profile.bio}
              />
              <label htmlFor="bio">Bio</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <label htmlFor="profile-picture-drop-zone">ProfilePicture</label>
              <DropZone onDrop={this.uploadProfilePicture.bind(this)} className="profile-picture-drop-zone center-align grey-text text-darken-3">
                {this.state.profilePicture ? (
                  <div>
                    <img src={this.state.profilePicture} src={this.state.profilePicture} />
                    <a className="btn waves-effect waves-light">
                      <i className="material-icons right"></i>
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
            {this.state.profilePictureUploadProgress ? (
            <div className="col s12">
              <div className="progress">
                <div className="determinate" style={{width: this.state.profilePictureUploadProgress + '%'}}></div>
              </div>
            </div>
            ) : undefined}
          </div>
          <div className="row">
            <div className="col s12">
              <button type="submit" name="action" className="btn waves-effect waves-light right">
                Submit Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

SettingsProfile.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
