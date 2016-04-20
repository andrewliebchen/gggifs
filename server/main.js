import { Meteor } from 'meteor/meteor';
import Giphy from 'giphy-api';

const giphy = Giphy('dc6zaTOxFJmzC');

Meteor.methods({
  getGifs() {
    giphy.search('cat', (err, res) => {
      if(res) {
        return res;
      }
    });
  }
});
