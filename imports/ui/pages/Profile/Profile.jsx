import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Games from '../../../api/Games/Games';
import GamesList from '../../components/GamesList/GamesList';
import ProfilesList from '../../components/ProfilesList/ProfilesList';
import Loading from '../../components/Loading/Loading';

export class Profile extends Component {
  componentDidMount() {
    $(document).ready(function(){
      $('ul.tabs').tabs();
    });
  }
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
  render() {
    return this.props.loading ? <Loading /> : (
      <div className="row">
        <div className="col s12 l5">
          <div className="profile-card card">
            <div className="card-image waves-effect waves-block waves-light">
              <img src={this.props.selectedUser.profile.profilePicture} className="activator" />
            </div>
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">
                {this.props.selectedUser.username}
                <a onClick={this.onFollowUser.bind(this)} className="btn waves-effect waves-light right">Follow</a>
              </span>
              <p className="grey-text text-darken-2">
                {this.props.selectedUser.profile.bio}
              </p>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">
                {this.props.selectedUser.username}
                <i className="material-icons right">close</i>
              </span>
              <p className="grey-text text-darken-2">
                {this.props.selectedUser.profile.bio}
              </p>
              <p className="grey-text text-darken-1">
                {this.props.selectedUser.profile.twitter}
              </p>
            </div>
          </div>
        </div>
        <div className="col s12 l7">
          <div className="row">
            <div className="profile-card col s12">
              <ul className="tabs">
                <li className="tab col s4">
                  <a href="#1">{this.props.games.length} Games</a>
                </li>
                <li className="tab col s4">
                  <a href="#2">{this.props.selectedUser.profile.followers.length} Followers</a>
                </li>
                <li className="tab col s4">
                  <a href="#3">{this.props.selectedUser.profile.followers.length} Following</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div id="1">
              <h5 className="grey-text text-darken-4">Games</h5>
              <div className="divider"></div>
              {this.props.gamesLoading ? <Loading /> : <GamesList games={this.props.games} />}
            </div>
            <div id="2">
              <h5 className="grey-text text-darken-4">Followers</h5>
              <div className="divider"></div>
              <ProfilesList users={this.props.selectedUser.profile.followers} />
            </div>
            <div id="3">
              <h5 className="grey-text text-darken-4">Following</h5>
              <div className="divider"></div>
              <ProfilesList users={this.props.selectedUser.profile.following} />
            </div>
          </div>
        </div>
        {/* <p>Followers: {this.props.selectedUser.profile.followers.length}</p>
        <p>Following: {this.props.selectedUser.profile.following.length }</p>
        <button onClick={this.onFollowUser.bind(this)}>Follow</button>
        {this.props.gamesLoading ? <Loading /> : <GamesList games={this.props.games} />}
        <ul>
          {this.followersList(this.props.selectedUser.profile.followers)}
        </ul>
        <ul>
          {this.followingList(this.props.selectedUser.profile.following)}
        </ul> */}
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
