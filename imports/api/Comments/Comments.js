import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Comments = new Mongo.Collection('comments');

Comments.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Comments.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Comments.schema = new SimpleSchema({
  _id: {
    type: String,
    label: 'The ID of the comment'
  },
  owner: {
    type: String,
    label: 'The username of the user the comment belongs to'
  },
  // createdAt: {
  //   type: Date,
  //   label: 'The date this comment was created'
  // },
  gameId: {
    type: String,
    label: 'The ID of the game the comment belongs to'
  },
  comment: {
    type: String,
    label: 'The comment'
  }
});

Comments.attachSchema(Comments.schema);

export default Comments;
