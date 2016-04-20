import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import Giphy from 'giphy-api';
import './main.html';

const giphy = Giphy('dc6zaTOxFJmzC');

Template.results.onCreated(function getGifs() {
  this.gif = new ReactiveVar();
  // This has to be on the server
  giphy.search('cat', (err, res) => {
    if(res) {
      Template.instance().gif.set(res);
    } else {
      console.log(err);
    }
  });
});

Template.results.helpers({
  result() {
    return Template.instance().gif.get();
  },
});
