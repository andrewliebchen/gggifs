import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';

import './main.html';

Session.setDefault('results', null);

Template.gifs.helpers({
  resultsTitle() {
    let results = Session.get('results');
    return results ? results.title : false;
  },

  results() {
    let results = Session.get('results');
    console.log(results);
    return results ? results.gifs.data : false;
  }
});

Template.userGifs.helpers({
  gifs() {
    console.log(Meteor.user().profile.gifs);
    return Meteor.user().profile.gifs;
  }
})


Template.header.events({
  'click .mtr-get-user-gifs'(event, instance) {
    Session.set('results', {
      title: 'Your gifs',
      gifs: Meteor.user().profile.gifs
    });
  }
});

Template.gifs.events({
  'keypress .mtr-gif-search'(event, instance) {
    const keyword = event.target.value;
    if(event.which === 13) {
      Meteor.call('getGifsByKeyword', keyword, (err, res) => {
        if(res){
          Session.set('results', {
            title: `Gifs matching "${keyword}"`,
            gifs: res
          });
        } else {
          Meteor.Error(err);
        }
      });
    }
  },

  'click .mtr-add-gif'(event, instance) {
    Meteor.call('addGif', {
      data: this.data,
      keyword: instance.$('.mtr-gif-search').val(),
      userId: Meteor.userId()
    });
  },

  'click .mtr-remove-gif'(event, instance) {
    // FIXME: It really needs it
    Meteor.call('removeGif', {
      gifId: this.id,
      userId: Meteor.userId()
    }, (err, res) => {
      if(res) {
        // Get the user collection again
        const gifIds = _.pluck(Meteor.user().profile.gifs, 'id');
        Meteor.call('getGifsByIds', gifIds, (err, res) => {
          if(res) {
            Session.set('results', {
              title: 'Your gifs',
              gifs: res
            });
          } else {
            Meteor.Error(err);
          }
        });
      }
    });
  }
});
