import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Games from '../../../api/Games/Games';
import GamesList from '../../components/GamesList/GamesList';
import Loading from '../../components/Loading/Loading';

export class Profile extends Component {
  onFollowUser() {
    if (!this.props.currentUser) {
      console.log('Please login to follow someone.');
    } else if (this.props.selectedUser.username === this.props.currentUser.username) {
      console.log('You can\'t follow yourself!');
    } else if ($.inArray(this.props.currentUser.username, this.props.selectedUser.profile.followers) > -1) {
      console.log('You\'ve already followed this user');
    } else {
      Meteor.users.update({_id: this.props.selectedUser._id}, {$push: {'profile.followers': this.props.currentUser.username}});
      Meteor.users.update({_id: this.props.currentUser._id}, {$push: {'profile.following': this.props.selectedUser.username}});
    }
  }
  followersList(followers) {
    return followers.map((follower) => (
      <li key={follower}>{follower}</li>
    ));
  }
  followingList(users) {
    return users.map((user) => (
      <li key={user}>{user}</li>
    ));
  }
  render() {
    return this.props.loading ? <Loading /> : (
      <div>
        <h1>Hi, i'm {this.props.selectedUser.username}</h1>
        <img src={this.props.selectedUser.profile.profilePicture} height="200" />
        <p>Twitter: {this.props.selectedUser.profile.twitter}</p>
        <p>Bio: {this.props.selectedUser.profile.bio}</p>
        <p>Followers: {this.props.selectedUser.profile.followers.length}</p>
        <p>Following: {this.props.selectedUser.profile.following.length }</p>
        <button onClick={this.onFollowUser.bind(this)}>Follow</button>
        {this.props.gamesLoading ? <Loading /> : <GamesList games={this.props.games} />}
        <ul>
          {this.followersList(this.props.selectedUser.profile.followers)}
        </ul>
        <ul>
          {this.followingList(this.props.selectedUser.profile.following)}
        </ul>
      </div>
    );
  }
}

Profile.propTypes = {
  loading: PropTypes.bool.isRequired,
  // selectedUser: PropTypes.object.isRequired,
  gamesLoading: PropTypes.bool.isRequired,
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default createContainer((props) => {
  const userSubscription = Meteor.subscribe('users.profileInfo', props.match.params.username);
  const gamesSubscription = Meteor.subscribe('games.owned', props.match.params.username);
  return {
    loading: !userSubscription.ready(),
    currentUser: Meteor.user(),
    selectedUser: Meteor.users.findOne({username: props.match.params.username}),
    gamesLoading: !gamesSubscription.ready(),
    games: Games.find().fetch()
  };
}, Profile);
