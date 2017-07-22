import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import $ from 'jquery';
import 'jquery-validation';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const component = this;

    $(this.refs.form).validate({
      rules: {
        username: {
          required: true,
          minlength: 4
        },
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          minlength: 6
        },
        repeatPassword: {
          required: true,
          equalTo: '#password'
        }
      },
      messages: {
        username: {
          required: `Please enter your username.`
        },
        email: {
          required: `Please enter a email address.`,
          email: 'Please enter a valid email address.'
        },
        password: {
          required: 'Please enter a password.',
          minlength: 'Please use at least 6 characters.'
        },
        repeatPassword: {
          required: 'Please repeat your password.',
          equalTo: 'The passwords don\'t match, please try again.'
        }
      },
      submitHandler() {
        component.handleSubmit();
      }
    });
  }

  handleSubmit() {
    let username = this.refs.username.value;
    let email = this.refs.email.value;
    let password = this.refs.password.value;
    let profilePicture = '/default-profile-picture.jpg';

    Accounts.createUser({
      username,
      email,
      password,
      privateInfo: {
        earnings: '1',
        purchases: '2',
        downloads: '3',
        views: '4'
      },
      profile: {
        profilePicture,
        twitter: '',
        bio: '',
        followers: [],
        following: []
      }
    }, (err) => {
      if (err) {
        Materialize.toast(err.reason);
      } else {
        console.log('Success!', 'Welcome!');
        Meteor.call('users.sendVerificationEmail', Meteor.userId(), (err) => {
          if (err) {
            Materialize.toast(err.reason, 4000);
          } else {
            Materialize.toast('Success! Check your inbox for a verification link.!', 4000, 'green');
          }
        })
        this.props.history.push('/');
      }
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="form-panel card-panel col s12 m6 offset-m3 z-depth-2">
            <h4 className="center-align grey-text text-darken-4">Sign up to indi.games</h4>
            <p className="center-align grey-text text-darken-1">Join our awesome community!</p>
            <form ref="form" onSubmit={e => e.preventDefault()}>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">account_circle</i>
                  <input type="text" id="username" ref="username" className="validate" />
                  <label htmlFor="username">Username</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">email</i>
                  <input type="email" id="email" ref="email" />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">lock</i>
                  <input type="password" id="password" ref="password" className="validate" />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">lock</i>
                  <input type="password" id="repeatPassword" ref="repeatPassword" className="validate" />
                  <label htmlFor="repeatPassword">Repeat Password</label>
                </div>
              </div>
              <button type="submit" name="action" className="btn waves-effect waves-light">Signup</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  history: PropTypes.object.isRequired
};
