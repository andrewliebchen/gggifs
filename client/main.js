import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

Template.gifs.onCreated(function getGifs() {
  this.gif = new ReactiveVar();
});

Template.gifs.helpers({
  results() {
    let gifs = Template.instance().gif.get();

    if(gifs) {
      return Template.instance().gif.get().data;
    }
  }
});

Template.gifs.events({
  'click .mtr-get-gifs'(event, instance) {
    const keyword = instance.$('.mtr-gif-search').val();

    Meteor.call('getGifs', keyword, (err, res) => {
      if(res){
        console.log(res);
        instance.gif.set(res);
      } else {
        console.warn(err);
      }
    });
  },

  'click .mtr-add-gif'(event, instance) {
    Meteor.call('addGif', {
      gifId: this.id,
      userId: Meteor.userId()
    });
  }
});
