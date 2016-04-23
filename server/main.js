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
    return giphy.id(args.gifId).then((res) => {
      return Meteor.users.update(args.userId, {
        $push: {
          'profile.gifs': {
            id: args.gifId,
            keywords: [args.keyword],
            data: res.data[0]
          }
        }
      });
    });
  },

  removeGif(args) {
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
