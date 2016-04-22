import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

Template.gifs.onCreated(function getGifs() {
  this.resultsTitle = new ReactiveVar();
  this.resultsGifs = new ReactiveVar();
});

Template.gifs.helpers({
  resultsTitle() {
    return Template.instance().resultsTitle.get();
  },

  results() {
    let gifs = Template.instance().resultsGifs.get();

    if(gifs) {
      return Template.instance().resultsGifs.get().data;
    }
  }
});

Template.gifs.events({
  'click .mtr-get-gifs'(event, instance) {
    const keyword = instance.$('.mtr-gif-search').val();
    Meteor.call('getGifsByKeyword', keyword, (err, res) => {
      if(res){
        console.log(res);
        instance.resultsTitle.set(`Gifs matching "${keyword}"`);
        instance.resultsGifs.set(res);
      } else {
        console.warn(err);
      }
    });
  },

  'click .mtr-get-user-gifs'(event, instance) {
    Meteor.call('getGifsByIds', Meteor.user().profile.gifs, (err, res) => {
      if(res) {
        instance.resultsTitle.set('Your gifs');
        instance.resultsGifs.set(res);
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
  },

  'click .mtr-remove-gif'(event, instance) {
    Meteor.call('removeGif', {
      gifId: this.id,
      userId: Meteor.userId()
    }, (err, res) => {
      if(res) {
        // Get the user collection again
        Meteor.call('getGifsByIds', Meteor.user().profile.gifs, (err, res) => {
          if(res) {
            instance.resultsGifs.set(res);
          } else {
            console.warn(err);
          }
        });
      }
    });
  }
});
