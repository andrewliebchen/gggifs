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

Template.header.events({
  'click .mtr-get-user-gifs'(event, instance) {
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
  },
});

Template.gifs.events({
  'keypress .mtr-gif-search'(event, instance) {
    const keyword = event.target.value;
    if(event.which === 13) {
      Meteor.call('getGifsByKeyword', keyword, (err, res) => {
        if(res){
          console.log(res);
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
    debugger;
    Meteor.call('addGif', {
      gifId: this.id,
      keyword: instance.$('.mtr-gif-search').val(),
      userId: Meteor.userId()
    });
  },

  // Fix this for new object array
  'click .mtr-remove-gif'(event, instance) {
    Meteor.call('removeGif', {
      gifId: this.id,
      userId: Meteor.userId()
    }, (err, res) => {
      if(res) {
        // Get the user collection again
        Meteor.call('getGifsByIds', Meteor.user().profile.gifs, (err, res) => {
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
