import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';

export default class VerifyEmail extends Component {
  componentDidMount() {
    Accounts.verifyEmail(this.props.match.params.token, (err) => {
      if (err) {
        console.log(err.reason);
      } else {
        console.log('Success!', 'Email verified!');
        this.props.history.push('/');
      }
    })
  }
  render() {
    return (
      <div>
        <p>Your verificaton link has expired or you've already verified your email.</p>
      </div>
    );
  }
}

VerifyEmail.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
