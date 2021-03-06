import { Meteor } from 'meteor/meteor';

FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('layout', {content: 'home'});
  }
});

FlowRouter.route('/u/:id', {
  subscriptions(id) {
     this.register('user', Meteor.subscribe('user', id));
   },

   action(id) {
     FlowRouter.subsReady('user', (id) => {
       BlazeLayout.render('layout', {content: 'userGifs'});
     });
   }
});
