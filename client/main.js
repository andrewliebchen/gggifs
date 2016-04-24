import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';

import './main.html';

Session.setDefault('results', null);

Template.header.helpers({
  currentUserId() {
    return Meteor.userId();
  }
});

Template.searchResults.helpers({
  resultsTitle() {
    let results = Session.get('results');
    return results ? `Gifs matching ${results.title}` : false;
  },

  results() {
    let results = Session.get('results');
    return results ? results.gifs.data : false;
  }
});

Template.userGifs.helpers({
  gifs() {
    return Meteor.users.findOne().profile.gifs;
  }
});

Template.search.events({
  'keypress .mtr-gif-search'(event, instance) {
    const keyword = event.target.value;
    if(event.which === 13) {
      Meteor.call('getGifsByKeyword', keyword, (err, res) => {
        if(res){
          Session.set('results', {
            title: keyword,
            gifs: res
          });
        } else {
          Meteor.Error(err);
        }
      });
    }
  }
});

Template.gifContent.events({
  'click .mtr-add-gif'(event, instance) {
    Meteor.call('addGif', {
      data: this.data,
      keyword: instance.$('.mtr-gif-search').val(),
      userId: Meteor.userId()
    });
  },

  'click .mtr-remove-gif'(event, instance) {
    Meteor.call('removeGif', {
      gifId: this.data.id,
      userId: Meteor.userId()
    }, (err, res) => {
      console.log('Deleted!');
    });
  }
});
