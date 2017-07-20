import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Games = new Mongo.Collection('games');

Games.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Games.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Games.schema = new SimpleSchema({
  _id: {
    type: String,
    label: 'The ID of this game',
  },
  owner: {
    type: String,
    label: 'The username of the user the game belongs to'
  },
  createdAt: {
    type: Date,
    label: 'The date this game was created',
    autoValue() {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  title: {
    type: String,
    label: 'The title of the game',
    max: 64
  },
  description: {
    type: String,
    label: 'A short description/tagline of the game',
    max: 64
  },
  uploadsFileType: {
    type: String,
    label: 'The game file type'
  },
  releaseStatus: {
    type: String,
    label: 'The release status of the game'
  },
  minPrice: {
    type: Number,
    label: 'The minimum price of the game'
  },
  uploads: {
    type: Array,
    label: 'The game files',
  },
  'uploads.$': {
    type: String
  },
  platforms: {
    type: Array,
    label: 'The game\'s supported platforms',
    min: 1
  },
  'platforms.$': {
    type: String
  },
  body: {
    type: String,
    label: 'The body of the game',
    min: 1,
    max: 9999
  },
  genre: {
    type: String,
    label: 'The game\'s genre',
    min: 1
  },
  genres: {
    type: Array,
    label: 'The games\'s genre',
    min: 1
  },
  'genres.$': {
    type: String
  },
  tags: {
    type: Array,
    label: 'The tags/keywords of the game',
    optional: true,
    max: 10
  },
  'tags.$': {
    type: String
  },
  bannerImage: {
    type: String,
    label: 'A game banner',
    optional: true
  },
  thumbnailImage: {
    type: String,
    label: 'A game thumbnail',
    optional: true
  },
  gameplayVideo: {
    type: String,
    label: 'A gameplay video or trailer',
    optional: true
  },
  screenshots: {
    type: Array,
    label: 'The screenshots of the game',
    optional: true,
  },
  'screenshots.$': {
    type: String
  },
  commentsEnabled: {
    type: Boolean,
    label: 'The visibility of the comments'
  },
  visibility: {
    type: Boolean,
    label: 'The visibility of the game'
  }
});

Games.attachSchema(Games.schema);

export default Games;
