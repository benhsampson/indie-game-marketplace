import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Games from '../Games';

Meteor.publish('games.featured', function gamesFeatured() {
  return Games.find({ featured: true });
});

Meteor.publish('games', function games() {
  return Games.find();
});

Meteor.publish('games.view', function gameView(gameId) {
  check(gameId, String);
  return Games.find({ _id: gameId });
});

Meteor.publish('games.updateView', function gameUpdateView(gameId) {
  check(gameId, String);
  return Games.find({ _id: gameId });
});

Meteor.publish('games.owned', function gameOwned(owner) {
  check(owner, String);
  return Games.find({ owner });
});
