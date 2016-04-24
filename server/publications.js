import { Meteor } from 'meteor/meteor';

Meteor.publish('user', (user) => {
  return [
    Meteor.users.find({_id: user.id}),
    Gifs.find({parent_id: user.id})
  ];
});
