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
    // Don't really need this, but we can keep it around
    return giphy.id(ids).then((res) => {
      console.log('Got results!');
      return res;
    });
  },

  addGif(args) {
    return Meteor.users.update(args.userId, {
      $push: {
        'profile.gifs': {
          data: args.data,
          keywords: [args.keyword]
        }
      }
    });
  },

  removeGif(args) {
    // FIXME: Does this work?
    return Meteor.users.update(args.userId, {
      $pull: {
        'profile.gifs': {
          id: args.gifId
        },
        false,
        true
      }
    });
  }
});
