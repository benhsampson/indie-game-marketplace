import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
// import Games from '../../../api/Games/Games';
// import GamesList from '../../components/GamesList/GamesList';
import Loading from '../../components/Loading/Loading';

const handleGameNav = _id => `/game/${_id}`;

export default class FeaturedGames extends Component {
  componentDidMount() {
    $(document).ready(function(){
      $('.parallax').parallax();
    });
  }
  render() {
    return (
      <div>
        <div className="introductory-banner parallax-container z-depth-3">
          {/* <a href="#" className="close white-text"><i className="material-icons">close</i></a> */}
          <div className="section center-align">
            <h1 className="white-text">Get the latest Indie Games</h1>
            <p className="white-text">
              Join a vibrant community of Indie Game enthusiasts and support developers you love.
              <Link to="/docs" className="learn-more blue-text text-lighten-3">Learn More</Link>
            </p>
          </div>
          <div className="parallax">
            <img src="/introductory-banner-image.png" />
          </div>
        </div>
        <div className="container">
          <div className="promotion-table row">
            <div className="col s12 m4 center-align">
              <i className="material-icons teal-text text-lighten-1">flash_on</i>
              <h5 className="grey-text text-darken-3">Speeds up development</h5>
              <p className="grey-text text-darken-1">
                We try to make the production stage for game developers as streamlined as possible.
                Our platform gives the tools for making smart decisions on how to sell and distribute your content.
              </p>
            </div>
            <div className="col s12 m4 center-align">
              <i className="material-icons teal-text text-lighten-1">group</i>
              <h5 className="grey-text text-darken-3">User experience focused</h5>
              <p className="grey-text text-darken-1">
                We focus on making our user interfaces and services as simple and clear as possible.
                We prioritize the development of your game and we've built this site around that.
              </p>
            </div>
            <div className="col s12 m4 center-align">
              <i className="material-icons teal-text text-lighten-1">settings</i>
              <h5 className="grey-text text-darken-3">Easy to work with</h5>
              <p className="grey-text text-darken-1">
                We have provided detailed documentation for helping users get started.
                We are open to feedback and any inquries too.
              </p>
            </div>
          </div>
        </div>
        {/* { this.props.loading ? <Loading /> : <GamesList games={this.props.games} /> } */}
      </div>
    );
  }
}

FeaturedGames.propTypes = {
  // loading: PropTypes.bool.isRequired,
  // games: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
//
// export default createContainer(() => {
//   const subscription = Meteor.subscribe('games.featured');
//   return {
//     loading: !subscription.ready(),
//     games: Games.find().fetch()
//   };
// }, FeaturedGames);
