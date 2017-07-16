import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Games from '../Games';
import rateLimit from '../../../modules/rate-limit';
import shortid from 'shortid';

Meteor.methods({
  'games.insert': function gamesInsert(game) {
    check(game, {
      title: String,
      description: String,
      uploadsFileType: String,
      releaseStatus: String,
      minPrice: Number,
      uploads: [Object],
      platforms: [String],
      body: String,
      genre: String,
      genres: [String],
      tags: Match.Maybe([String]),
      bannerImage: Match.Maybe(String),
      thumbnailImage: Match.Maybe(String),
      gameplayVideo: Match.Maybe(String),
      screenshots: Match.Maybe([String]),
      commentsEnabled: Boolean,
      visibility: Boolean
    });

    return Games.insert({ _id: shortid.generate(), owner: Meteor.user().username, ...game });
  },
  'games.update': function gamesUpdate(game) {
    check(game, {
      _id: String,
      title: String,
      description: String,
      uploadsFileType: String,
      releaseStatus: String,
      minPrice: Number,
      uploads: [Object],
      platforms: [String],
      body: String,
      genre: String,
      genres: [String],
      tags: Match.Maybe([String]),
      bannerImage: Match.Maybe(String),
      thumbnailImage: Match.Maybe(String),
      gameplayVideo: Match.Maybe(String),
      screenshots: Match.Maybe([String]),
      commentsEnabled: Boolean,
      visibility: Boolean
    });

    Games.update(game._id, { $set: game });
    return game._id;
  },
  'games.remove': function gamesRemove(gameId) {
    check(gameId, String);

    Games.remove(gameId);
  }
});

rateLimit({
  methods: [
    'games.insert',
    'games.update',
    'games.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
