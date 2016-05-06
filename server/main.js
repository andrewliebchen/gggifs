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
    console.log(args.tag);
    return Gifs.insert({
      data: args.data,
      tags: [args.tag],
      parent_id: args.userId
    });
  },

  removeGif(id) {
    return Gifs.remove(id);
  },

  addTag(args) {
    return Gifs.update(args.id, {
      $push: {
        tags: args.tag
      }
    });
  },

  removeTag(args) {
    return Gifs.update(args.id, {
      $pull: {
        tags: args.tag
      }
    });
  },

  updateRank(args) {
    return Gifs.update(args.id, {
      $set: {
        rank: args.rank
      }
    });
  }
});
