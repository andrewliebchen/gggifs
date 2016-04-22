import { Meteor } from 'meteor/meteor';
import Giphy from 'giphy-api';

const giphy = Giphy('dc6zaTOxFJmzC');

Meteor.methods({
  getGifsByKeyword(keyword) {
    return giphy.search(keyword).then((res) => {
      console.log(`Got results for ${keyword}!`);
      return res;
    });
  },

  getGifsByIds(ids) {
    return giphy.id(ids).then((res) => {
      console.log('Got results!');
      return res;
    });
  },

  addGif(args) {
    return Meteor.users.update(args.userId, {
      $push: {
        'profile.gifs': args.gifId
      }
    });
  },

  removeGif(args) {
    return Meteor.users.update(args.userId, {
      $pull: {
        'profile.gifs': args.gifId
      }
    });
  }
});
