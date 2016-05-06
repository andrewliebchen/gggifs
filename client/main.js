import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';

import './main.html';

const canEdit = (ownerId) => {
  return ownerId === Meteor.userId();
}

Session.setDefault('results', null);

Template.header.helpers({
  currentUserId() {
    return Meteor.userId();
  }
});

Template.searchResults.helpers({
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

Template.removeGif.helpers({
  canEdit() {
    return this.gif ? canEdit(this.gif.parent_id) : false;
  }
});

Template.tags.helpers({
  canEdit() {
    return this.gif ? canEdit(this.gif.parent_id) : false;
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

Template.addGif.events({
  'click .mtr-add-gif'(event, instance) {
    Meteor.call('addGif', {
      data: this.data,
      tag: FlowRouter.getQueryParam('search'),
      userId: Meteor.userId()
    }, (err, res) => {
      if(res) {
        console.log('Added!');
      }
    });
  },
});

Template.removeGif.events({
  'click .mtr-remove-gif'() {
    Meteor.call('removeGif', this.gif._id, (err, res) => {
      if(res) {
        console.log('Deleted!');
      }
    });
  }
})

Template.tags.events({
  'keypress .mtr-add-tag'(event, instance) {
    if(event.which === 13) {
      Meteor.call('addTag', {
        id: this.gif._id,
        tag: event.target.value
      }, (err, res) => {
        event.target.value = '';
      });
    }
  }
});

Template.singleTag.events({
  'click .mtr-remove-tag'(event, instance) {
    Meteor.call('removeTag', {
      id: this.id,
      tag: this.data
    }, (err, res) => {
      console.log('Tag removed');
    });
  }
});
