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
    return Gifs.find({});
  }
});

Template.search.events({
  'keypress .mtr-gif-search'(event, instance) {
    const keyword = event.target.value;
    if(event.which === 13) {
      FlowRouter.go('/');
      FlowRouter.setQueryParams({search: keyword});

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
      keyword: FlowRouter.getQueryParam('search'),
      userId: Meteor.userId()
    }, (err, res) => {
      if(res) {
        console.log('Added!');
      }
    });
  },

  'click .mtr-remove-gif'() {
    Meteor.call('removeGif', this.id, (err, res) => {
      if(res) {
        console.log('Deleted!');
      }
    });
  }
});

Template.keywords.events({
  'keypress .mtr-add-keyword'(event, instance) {
    if(event.which === 13) {
      Meteor.call('addKeyword', {
        id: this.id,
        keyword: event.target.value
      }, (err, res) => {
        event.target.value = '';
      });
    }
  }
});

Template.singleKeyword.events({
  'click .mtr-remove-keyword'(event, instance) {
    Meteor.call('removeKeyword', {
      id: this.gifId,
      keyword: this.data
    }, (err, res) => {
      console.log('Keyword removed');
    });
  }
})
