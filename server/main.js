import { Meteor } from 'meteor/meteor';
import Giphy from 'giphy-api';

const giphy = Giphy('dc6zaTOxFJmzC');

Meteor.startup(() => {
  giphy.search('pokemon', (err, res) => {
      console.log(res);
  });

});
