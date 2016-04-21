import { Meteor } from 'meteor/meteor';
import Giphy from 'giphy-api';

const giphy = Giphy('dc6zaTOxFJmzC');

Meteor.methods({
  getGifs() {
    return giphy.search('cat').then((res) => {
      console.log('Got it!');
      return res;
    });
  }
});
