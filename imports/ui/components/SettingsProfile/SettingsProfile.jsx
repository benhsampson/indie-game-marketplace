import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Accounts } from 'meteor/accounts-base';
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
  uploadProfilePicture() {
    const metaContext = { title: 'test' };

    const profilePicture = document.getElementById('profilePictureUpload').files[0];
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
        <form ref="form" onSubmit={e => e.preventDefault()}>
          <label htmlFor="username">Username</label>
          <input defaultValue={this.props.user.username} type="text"  id="username" ref="username" />
          <br />
          <label htmlFor="email">Email</label>
          <input defaultValue={this.props.user.emails[0].address} type="email" id="email" ref="email" />
          <br />
          <label htmlFor="twitter">Twitter</label>
          <input defaultValue={this.props.user.profile.twitter} type="text" id="twitter" ref="twitter" defaultValue="@" />
          <br />
          <label htmlFor="bio">Bio</label><br />
          <textarea id="bio" ref="bio" />
          <p>
            <label htmlFor="profilePictureUpload">Profile Picture</label>
            <input type="file" id="profilePictureUpload" accept="image/*" onChange={this.uploadProfilePicture.bind(this)} />
          </p>
          <img src={this.state.profilePicture} height="200" />
          <p>{this.state.profilePictureUploadProgress}</p>
          <button type="submit">Save Profile</button>
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
