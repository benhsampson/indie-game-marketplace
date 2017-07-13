import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

const Dashboard = ({earnings, purchases, downloads, views}) => (
  <div>
    <h4>Developer Dashboard</h4>
    <p>Earnings: {earnings}</p>
    <p>Puchases: {purchases}</p>
    <p>Downloads: {downloads}</p>
    <p>Views: {views}</p>
  </div>
);

Dashboard.propTypes = {
  // currentUser: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default createContainer(() => {
  console.log(Meteor.user().profile);
  return {
    currentUser: Meteor.user().privateInfo
  };
}, Dashboard);
