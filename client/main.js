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

Template.gifs.events({
  'click .get-gifs'(event, instance) {
    console.log('click');
    Meteor.call('getGifs', (err, res) => {
      if(res){
        console.log(res);
        instance.gif.set(res);
      }
    });
  }
});
