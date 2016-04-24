import { Meteor } from 'meteor/meteor';

Meteor.publish('user', (id) => {
  return Meteor.users.find({_id: id});
});
