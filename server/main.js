import { Meteor } from 'meteor/meteor';
import Giphy from 'giphy-api';

const giphy = Giphy('dc6zaTOxFJmzC');

Meteor.methods({
  getGifs(keyword) {
    return giphy.search(keyword).then((res) => {
      console.log(`Got results for ${keyword}`);
      return res;
    });
  }
});
