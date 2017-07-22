import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Games from '../Games';
import shortid from 'shortid';
import moment from 'moment';
import rateLimit from '../../../modules/rate-limit';

Meteor.methods({
  'games.insert': function gamesInsert(game) {
    check(game, {
      title: String,
      description: String,
      uploadsFileType: String,
      releaseStatus: String,
      // minPrice: Number,
      uploads: Match.Where((upload) => {
        _.each(uploads, function(upload) {
          check(upload._id, String);
          check(upload.number, Number);
          check(upload.name, String);
          check(upload.filePath, String);
          check(upload.platforms, Object);
        });

        return true;
      }),
      upload: String,
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

    return Games.insert({
      _id: shortid.generate(),
      owner: Meteor.user().username,
      createdAt: moment().valueOf(),
      updatedAt: moment().valueOf(),
      ...game
    });
  },
  'games.update': function gamesUpdate(game) {
    check(game, {
      _id: String,
      title: String,
      description: String,
      uploadsFileType: String,
      releaseStatus: String,
      // minPrice: Number,
      uploads: [Object],
      // upload: [String],
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

    Games.update(game._id, { $set: {updatedAt: moment().valueOf(), game} });
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
