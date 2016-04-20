import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

Template.gifs.onCreated(function getGifs() {
  this.gif = new ReactiveVar();
});

Template.gifs.helpers({
  result() {
    return Template.instance().gif.get();
  }
});

Template.gifs.helpers({
  'click .get-gifs'(event, instance) {
    Meteor.call('getGifs', (err, res) => {
      if(res){
        instance.gif.set(res);
      }
    });
  }
});
