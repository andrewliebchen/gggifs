import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
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
    return Gifs.insert({
      data: args.data,
      keywords: [args.keyword],
      parent_id: args.userId
    });
  },

  removeGif(id) {
    return Gifs.remove(id);
  },

  addKeyword(args) {
    return Gifs.update(args.id, {
      $push: {
        keywords: args.keyword
      }
    });
  }
});
