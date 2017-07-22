import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Games from '../../../api/Games/Games';
import GamesList from '../../components/GamesList/GamesList';
import Loading from '../../components/Loading/Loading';
// import FilteredGamesList from '../../components/FilteredGamesList/FilteredGamesList';

export class BrowseGames extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     platform: 'any',
  //     genre: 'any'
  //   };
  //
  //   this.onSelectGenre = this.onSelectGenre.bind(this);
  //   this.onSelectPlatform = this.onSelectPlatform.bind(this);
  // }
  // componentDidMount() {
  //   $(document).ready(function() {
  //     $('select').material_select();
  //   });
  // }
  // onSelectGenre() {
  //   console.log('changed genre filter');
  //   this.setState({genre: this.refs.genre.value});
  // }
  // onSelectPlatform() {
  //   console.log('changed platform filter');
  //   this.setState({platform: this.refs.platform.value});
  // }
  render() {
    return (
      <div>
        {/* <div className="card-panel">
          <div className="row">
            <div className="input-field col s12">
              <select id="genre" ref="genre" defaultValue="any" className="required">
                <option value="any" onClick={this.onSelectGenre()}>Choose Genre</option>
                <option value="action" onClick={this.onSelectGenre()}>Action</option>
                <option value="platformer" onClick={this.onSelectGenre()}>Platformer</option>
                <option value="shooter" onClick={this.onSelectGenre()}>Shooter</option>
              </select>
              <label htmlFor="genre">Genre</label>
            </div>
            {this.state.genre}
          </div>
          <div className="row">
            <div className="input-field col s12">
              <select id="platform" ref="platform" defaultValue="any" className="required">
                <option value="any" onClick={this.onSelectPlatform()}>Choose Platform</option>
                <option value="windows" onClick={this.onSelectPlatform()}>Windows</option>
                <option value="macOS" onClick={this.onSelectPlatform()}>Mac OS</option>
                <option value="linux" onClick={this.onSelectPlatform()}>Linux</option>
              </select>
              <label htmlFor="platform">Platform</label>
            </div>
            {this.state.platform}
          </div>
        </div> */}
        {/* <FilteredGamesList genre={this.state.genre} platform={this.state.platform} /> */}
        {this.props.loading ? <Loading /> :<GamesList games={this.props.games} /> }
      </div>
    );
  }
}

BrowseGames.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('games');
  return {
    loading: !subscription.ready(),
    games: Games.find().fetch()
  }
}, BrowseGames);
