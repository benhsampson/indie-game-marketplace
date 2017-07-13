import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import $ from 'jquery';
import 'jquery-validation';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const component = this;

    $(this.refs.form).validate({
      rules: {
        usernameOrEmail: {
          required: true
        },
        password: {
          required: true,
          minlength: 6
        }
      },
      messages: {
        usernameOrEmail: {
          required: 'Please enter a username or email here.'
        },
        password: {
          required: 'Please enter a password.',
          minlength: 'Please use at least six characters.'
        }
      },
      submitHandler() {
        component.handleSubmit();
      }
    });
  }
  handleSubmit() {
    let usernameOrEmail = this.refs.usernameOrEmail.value;
    let password = this.refs.password.value;

    Meteor.loginWithPassword(usernameOrEmail, password, (err) => {
      if (err) {
        Materialize.toast(err.reason, 4000);
      } else {
        Materialize.toast('Success! Welcome back!', 4000, 'green');
        this.props.history.push('/');
      }
    });
  }
  render() {
    return (
      <div className="row">
        <div className="form-panel card-panel col s12 m6 l4 offset-m3 offset-l4 z-depth-2">
          <h4 className="center-align grey-text text-darken-4">Login to PLACEHOLDER</h4>
          <p className="center-align grey-text text-darken-1">Welcome back!</p>
          <form ref="form" onSubmit={e => e.preventDefault()}>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">account_circle</i>
                <input type="text" id="usernameOrEmail" ref="usernameOrEmail" className="validate" />
                <label htmlFor="usernameOrEmail">Username</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">lock</i>
                <input type="password" id="password" ref="password" className="validate" />
                <label htmlFor="password">Password</label>
              </div>
              <Link to="/recover-password" className="forgot-password right">Forgot Password?</Link>
            </div>
            <button type="submit" name="action" className="btn waves-effect waves-light">Signup</button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired
};
